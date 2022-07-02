<div className='container-fluid nav_bg'>
    <div className='row'>
        <div className='col-10 mx-auto' >
        </div>
    </div>
</div>




const [cname,setcname]=useState([false,false,false,false]);
  
  const cchange=(num)=>{
    let l=[false,false,false,false];
    l[num]=true;
    setcname(l);      
  }
  return (
    <>
    <div className='container-fluid nav_bg'>
        <div className='row'>
            <div className='col-10 mx-auto' >
                <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                    <div className="container-fluid">
                        <NavLink exact activeClassName="menu_active" className="navbar-brand" to="/">SV Couriers</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <NavLink className={cname[0]} onClick={()=>{cchange(0)}} ClassName="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={cname[1]} onClick={()=>{cchange(1)}} ClassName="nav-link active" aria-current="page" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={cname[2]} onClick={()=>{cchange(2)}} ClassName="nav-link active" aria-current="page" to="/price">Prices</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={cname[3]} onClick={()=>{cchange(3)}} ClassName="nav-link active" aria-current="page" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>