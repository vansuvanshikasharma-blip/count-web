import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness, Building2, CheckCircle2, FileText, Home, LogOut,
  Menu, Search, UserRound, Users, X, MapPin, Bookmark, ChevronRight,
  Clock3, IndianRupee, ShieldCheck
} from "lucide-react";

const API = "http://localhost:8080/api";

function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("jobwaleUser")); } catch { return null; }
}

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("jobwaleToken");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  if (!res.ok) throw new Error((await res.text()) || "Request failed");
  return res.status === 204 ? null : res.json();
}

function Layout({ children }) {
  const user = getStoredUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("jobwaleUser");
    localStorage.removeItem("jobwaleToken");
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/"><span>J</span> JobWale</Link>
        <nav className={open ? "nav open" : "nav"}>
          <Link to="/jobs" onClick={() => setOpen(false)}>Find Jobs</Link>
          <Link to="/connections" onClick={() => setOpen(false)}>Connections</Link>
          {user && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
          {user ? (
            <button className="nav-profile" onClick={() => { navigate("/profile"); setOpen(false); }}>
              <UserRound size={17}/> {user.name}
            </button>
          ) : <Link className="nav-login" to="/login">Login</Link>}
          {user && <button className="icon-btn mobile-close" onClick={() => setOpen(false)}><X/></button>}
        </nav>
        <button className="icon-btn menu-btn" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </header>
      <main>{children}</main>
      <footer><strong>JobWale</strong> · Jobs, people and opportunities in one place.</footer>
    </div>
  );
}

function Protected({ children, roles }) {
  const user = getStoredUser();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <Layout>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">CAREER PLATFORM</span>
          <h1>Find work that <em>fits</em> your future.</h1>
          <p>Search thousands of opportunities, build your professional network and connect with recruiters.</p>
          <div className="hero-search">
            <Search/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Job title, skill or keyword" />
            <button onClick={() => navigate(`/jobs?q=${encodeURIComponent(q)}`)}>Search Jobs</button>
          </div>
          <div className="quick-tags">
            <span>Popular:</span><button onClick={() => navigate("/jobs?q=React")}>React</button>
            <button onClick={() => navigate("/jobs?q=Java")}>Java</button>
            <button onClick={() => navigate("/jobs?q=UI%20UX")}>UI/UX</button>
            <button onClick={() => navigate("/jobs?q=Data")}>Data</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="floating-stat"><strong>12K+</strong><span>Active jobs</span></div>
          <div className="hero-orb"><BriefcaseBusiness size={76}/></div>
          <div className="floating-stat second"><strong>4.8K</strong><span>Recruiters</span></div>
        </div>
      </section>
      <section className="feature-grid">
        <Feature icon={<Search/>} title="Smart job search" text="Filter by location, salary, category and experience."/>
        <Feature icon={<Users/>} title="Professional network" text="Build meaningful connections with professionals."/>
        <Feature icon={<FileText/>} title="One resume" text="Upload your resume and make it visible to recruiters."/>
      </section>
    </Layout>
  );
}
function Feature({ icon, title, text }) { return <article className="feature-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>; }

function LoginPage({ signup = false }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"JOB_SEEKER" });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setError("");
    try {
      const data = await apiFetch(signup ? "/auth/signup" : "/auth/login", {
        method: "POST", body: JSON.stringify(form)
      });
      localStorage.setItem("jobwaleToken", data.token || "demo-token");
      localStorage.setItem("jobwaleUser", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) { setError(err.message + " — start the Java backend or use the demo mode below."); }
  }
  function demo() {
    const user = { id:"demo", name: signup ? form.name || "Demo User" : "Aarav Sharma", email:form.email || "demo@jobwale.com", role:form.role };
    localStorage.setItem("jobwaleUser", JSON.stringify(user));
    localStorage.setItem("jobwaleToken", "demo-token");
    navigate("/dashboard");
  }
  return <Layout><div className="auth-wrap"><form className="auth-card" onSubmit={submit}>
    <div className="auth-head"><span className="eyebrow">{signup ? "JOIN JOBWALE" : "WELCOME BACK"}</span><h1>{signup ? "Create your account" : "Sign in to JobWale"}</h1><p>{signup ? "Choose your role and start building your career." : "Continue your job search and professional network."}</p></div>
    {signup && <><label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label></>}
    <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>Password<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
    <label>Role<select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
      <option value="JOB_SEEKER">Job Seeker</option><option value="RECRUITER">Recruiter</option><option value="ADMIN">Admin</option>
    </select></label>
    {error && <div className="error">{error}</div>}
    <button className="primary full">{signup ? "Create account" : "Login"}</button>
    <button type="button" className="secondary full" onClick={demo}>Use demo mode</button>
    <p className="auth-switch">{signup ? "Already have an account? " : "New to JobWale? "}<Link to={signup ? "/login" : "/signup"}>{signup ? "Login" : "Create account"}</Link></p>
  </form></div></Layout>;
}

function JobsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({ q:params.get("q")||"", location:"", category:"", experience:"", salary:"" });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("jobwaleJobs") || "null");
    if (local) setJobs(local);
    else loadJobs();
  }, []);
  async function loadJobs() {
    setLoading(true);
    try { setJobs(await apiFetch("/jobs")); } catch {
      setJobs([
        {id:"1",title:"Frontend Developer",company:"Nova Technologies",location:"Bengaluru",category:"Technology",experience:"1-3 years",salary:"₹6-10 LPA",description:"Build polished React experiences.",skills:["React","JavaScript","CSS"]},
        {id:"2",title:"Java Backend Engineer",company:"FinEdge",location:"Pune",category:"Technology",experience:"2-4 years",salary:"₹8-14 LPA",description:"Design scalable Spring Boot APIs.",skills:["Java","Spring Boot","MongoDB"]},
        {id:"3",title:"UI/UX Designer",company:"Wibe Studio",location:"Gurugram",category:"Design",experience:"0-2 years",salary:"₹4-8 LPA",description:"Create human-centered digital products.",skills:["Figma","UX","Research"]}
      ]);
    } finally { setLoading(false); }
  }
  const filtered = useMemo(() => jobs.filter(j =>
    [j.title,j.company,j.description,...(j.skills||[])].join(" ").toLowerCase().includes(filters.q.toLowerCase()) &&
    (!filters.location || j.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.category || j.category === filters.category) &&
    (!filters.experience || j.experience === filters.experience) &&
    (!filters.salary || j.salary?.includes(filters.salary))
  ), [jobs, filters]);
  return <Layout><section className="page">
    <div className="page-title"><div><span className="eyebrow">OPPORTUNITIES</span><h1>Find your next role</h1></div><span className="result-count">{filtered.length} jobs</span></div>
    <div className="job-layout">
      <aside className="filters">
        <h3>Filter jobs</h3>
        <label>Keyword<input value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})} placeholder="e.g. React"/></label>
        <label>Location<input value={filters.location} onChange={e=>setFilters({...filters,location:e.target.value})} placeholder="e.g. Delhi"/></label>
        <label>Category<select value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}><option value="">All categories</option><option>Technology</option><option>Design</option><option>Marketing</option><option>Finance</option></select></label>
        <label>Experience<select value={filters.experience} onChange={e=>setFilters({...filters,experience:e.target.value})}><option value="">Any experience</option><option>0-2 years</option><option>1-3 years</option><option>2-4 years</option><option>5+ years</option></select></label>
        <label>Salary<select value={filters.salary} onChange={e=>setFilters({...filters,salary:e.target.value})}><option value="">Any salary</option><option>₹4-8 LPA</option><option>₹6-10 LPA</option><option>₹8-14 LPA</option></select></label>
        <button className="secondary full" onClick={()=>setFilters({q:"",location:"",category:"",experience:"",salary:""})}>Clear filters</button>
      </aside>
      <div className="jobs-list">{loading ? <div className="empty">Loading jobs...</div> : filtered.map(job => <JobCard key={job.id} job={job} saved={saved.includes(job.id)} toggleSave={()=>setSaved(s=>s.includes(job.id)?s.filter(x=>x!==job.id):[...s,job.id])}/>)}
      {!loading && !filtered.length && <div className="empty"><Search size={40}/><h3>No jobs found</h3><p>Try broadening your filters.</p></div>}</div>
    </div>
  </section></Layout>;
}

function JobCard({ job, saved, toggleSave }) {
  const navigate = useNavigate();
  return <article className="job-card"><div className="company-logo">{job.company?.slice(0,1)}</div><div className="job-main"><div className="job-top"><div><h3>{job.title}</h3><p className="company">{job.company}</p></div><button className={saved?"save active":"save"} onClick={toggleSave}><Bookmark size={19}/></button></div><div className="meta"><span><MapPin size={15}/>{job.location}</span><span><BriefcaseBusiness size={15}/>{job.experience}</span><span><IndianRupee size={15}/>{job.salary}</span></div><p>{job.description}</p><div className="skills">{(job.skills||[]).map(s=><span key={s}>{s}</span>)}</div><button className="text-btn" onClick={()=>navigate(`/jobs/${job.id}`)}>View details <ChevronRight size={16}/></button></div></article>;
}

function JobDetails({ id }) {
  const user = getStoredUser();
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState("");
  useEffect(()=>{ apiFetch(`/jobs/${id}`).then(setJob).catch(()=>setJob({id,title:"Frontend Developer",company:"Nova Technologies",location:"Bengaluru",category:"Technology",experience:"1-3 years",salary:"₹6-10 LPA",description:"Build production-ready web applications and collaborate with designers and backend engineers.",skills:["React","JavaScript","CSS"]})); },[id]);
  if (!job) return <Layout><div className="empty">Loading...</div></Layout>;
  async function apply() {
    if (!user) return;
    try { await apiFetch(`/jobs/${id}/apply`, {method:"POST",body:JSON.stringify({userId:user.id})}); } catch {}
    setStatus("Applied");
  }
  return <Layout><section className="page narrow"><Link className="back" to="/jobs">← Back to jobs</Link><article className="details-card"><div className="details-head"><div className="company-logo big">{job.company?.slice(0,1)}</div><div><span className="eyebrow">{job.category}</span><h1>{job.title}</h1><p className="company">{job.company} · {job.location}</p></div></div><div className="meta large"><span><MapPin/> {job.location}</span><span><Clock3/> Full time</span><span><IndianRupee/> {job.salary}</span></div><h3>About the role</h3><p>{job.description}</p><h3>Skills</h3><div className="skills">{job.skills.map(s=><span key={s}>{s}</span>)}</div>{user?.role==="JOB_SEEKER" ? <button className="primary" onClick={apply}>{status || "Apply now"}</button> : <p className="muted">Login as a job seeker to apply.</p>}</article></section></Layout>;
}

function Dashboard() {
  const user = getStoredUser();
  return <Layout><section className="page"><div className="dashboard-banner"><div><span className="eyebrow">YOUR SPACE</span><h1>Welcome, {user?.name?.split(" ")[0] || "there"}.</h1><p>{user?.role==="RECRUITER"?"Find great people for your open roles.":user?.role==="ADMIN"?"Manage the JobWale platform.":"Track your applications and grow your network."}</p></div><ShieldCheck size={62}/></div>
    {user?.role==="RECRUITER" ? <RecruiterDashboard/> : user?.role==="ADMIN" ? <AdminDashboard/> : <SeekerDashboard/>}
  </section></Layout>;
}
function SeekerDashboard(){ return <div className="dash-grid"><Stat icon={<FileText/>} n="4" t="Applications"/><Stat icon={<CheckCircle2/>} n="2" t="Shortlisted"/><Stat icon={<Users/>} n="18" t="Connections"/><div className="panel wide"><h3>Application status</h3><div className="status-row"><span>Frontend Developer · Nova Technologies</span><b className="badge applied">Applied</b></div><div className="status-row"><span>UI Designer · Wibe Studio</span><b className="badge shortlisted">Shortlisted</b></div></div></div> }
function RecruiterDashboard(){ return <div className="dash-grid"><Stat icon={<BriefcaseBusiness/>} n="12" t="Open jobs"/><Stat icon={<Users/>} n="86" t="Applicants"/><Stat icon={<CheckCircle2/>} n="14" t="Shortlisted"/><div className="panel wide"><h3>Recent applicants</h3>{["Aarav Sharma","Meera Kapoor","Rohan Verma"].map((x,i)=><div className="status-row" key={x}><span>{x} · Software Engineer</span><b className="badge">{i===0?"Shortlisted":"Applied"}</b></div>)}</div></div>}
function AdminDashboard(){ return <div className="dash-grid"><Stat icon={<Users/>} n="8,420" t="Users"/><Stat icon={<BriefcaseBusiness/>} n="1,284" t="Jobs"/><Stat icon={<Building2/>} n="912" t="Recruiters"/><div className="panel wide"><h3>Admin controls</h3><p>Review users, moderate job posts and monitor applications from the admin console.</p></div></div>}
function Stat({icon,n,t}){return <div className="stat-card"><div className="feature-icon">{icon}</div><strong>{n}</strong><span>{t}</span></div>}

function Profile() {
  const user=getStoredUser();
  const [resume,setResume]=useState(null);
  const [message,setMessage]=useState("");
  function upload(e){const f=e.target.files?.[0]; if(f){setResume(f.name);setMessage("Resume selected. Connect the Java upload endpoint to persist it.");}}
  return <Layout><section className="page narrow"><div className="profile-card"><div className="avatar">{user?.name?.slice(0,1)||"J"}</div><span className="eyebrow">{user?.role?.replace("_"," ")}</span><h1>{user?.name}</h1><p>{user?.email}</p><div className="profile-actions">{user?.role==="JOB_SEEKER"&&<label className="primary upload">Upload resume<input type="file" accept=".pdf,.doc,.docx" onChange={upload}/></label>}<Link className="secondary" to="/connections"><Users size={17}/> My connections</Link></div>{resume&&<div className="resume-box"><FileText/> {resume}<span className="badge applied">Ready</span></div>}{message&&<p className="success">{message}</p>}</div></section></Layout>;
}

function Connections(){const people=[{name:"Meera Kapoor",role:"Recruiter · FinEdge",mutual:12},{name:"Rohan Verma",role:"Software Engineer · Nova",mutual:8},{name:"Ishita Jain",role:"Product Designer · Wibe",mutual:5}];const [connected,setConnected]=useState([]);return <Layout><section className="page narrow"><div className="page-title"><div><span className="eyebrow">NETWORK</span><h1>Connections</h1></div></div><div className="people">{people.map(p=><article className="person" key={p.name}><div className="avatar">{p.name[0]}</div><div><h3>{p.name}</h3><p>{p.role}</p><small>{p.mutual} mutual connections</small></div><button className={connected.includes(p.name)?"secondary":"primary"} onClick={()=>setConnected(s=>s.includes(p.name)?s.filter(x=>x!==p.name):[...s,p.name])}>{connected.includes(p.name)?"Connected":"Connect"}</button></article>)}</div></section></Layout>}

function App() {
  return <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<LoginPage signup/>}/>
    <Route path="/jobs" element={<JobsPage/>}/>
    <Route path="/jobs/:id" element={<JobRoute/>}/>
    <Route path="/dashboard" element={<Protected><Dashboard/></Protected>}/>
    <Route path="/profile" element={<Protected><Profile/></Protected>}/>
    <Route path="/connections" element={<Protected><Connections/></Protected>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}
function JobRoute(){const {pathname}=useLocation();return <JobDetails id={pathname.split("/").pop()}/>}

export default App;