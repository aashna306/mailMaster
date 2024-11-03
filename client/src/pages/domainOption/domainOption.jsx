// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDomains, addDomain } from "../../redux/domainSlice";
// import toast from "react-hot-toast";
// import "./domain.scss";
// import { Link } from "react-router-dom";

// const AddDomainPage = () => {
//   const dispatch = useDispatch();
//   const { domains, isLoading, error } = useSelector((state) => state.domains);
//   const [domainName, setDomainName] = useState("");

//   useEffect(() => {
//     dispatch(fetchDomains());
//   }, [dispatch]);

//   const handleAddDomain = (e) => {
//     e.preventDefault();
//     if (!domainName.trim()) {
//       toast.error("Domain name cannot be empty!");
//       return;
//     }
//     dispatch(addDomain(domainName))
//       .unwrap()
//       .then(() => {
//         toast.success("Domain added successfully!");
//         dispatch(fetchDomains());
//       })
//       .catch(() => {
//         toast.error("Failed to add domain.");
//       });
//     setDomainName("");
//   };

//   return (
//     <div className="add-domain-page">
//       <div className="form-container">
//         <h2>Add a New Domain</h2>
//         <form onSubmit={handleAddDomain}>
//           <input
//             type="text"
//             value={domainName}
//             placeholder="Enter domain name"
//             onChange={(e) => setDomainName(e.target.value)}
//             className="input-field"
//             required
//           />

//           <button type="submit" className="submit-button">
//             <Link to="/domain-option">Add Domain</Link>
//           </button>
//         </form>
//       </div>
//       <div style={{ marginBottom: "20px" }}>
//         <button className="fetch">
//           <Link to="/separation">Fetch mails</Link>
//         </button>
//       </div>
//       <div className="domain-list">
//         <h3>Domains</h3>
//         {isLoading ? (
//           <p>Loading domains...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : (
//           <ul>
//             {domains && domains.length > 0 ? (
//               domains.map((domain) => (
//                 <li key={domain._id} className="domain-item">
//                   {domain.domainName}
//                 </li>
//               ))
//             ) : (
//               <p>No domains found.</p>
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddDomainPage;


//////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDomains, addDomain } from "../../redux/domainSlice";
import toast from "react-hot-toast";
import "./domain.scss";
import { Link } from "react-router-dom";

const AddDomainPage = () => {
  const dispatch = useDispatch();
  const { domains, isLoading, error } = useSelector((state) => state.domains);
  const [domainName, setDomainName] = useState("");

  useEffect(() => {
    dispatch(fetchDomains());
  }, [dispatch]);

  const handleAddDomain = (e) => {
    e.preventDefault();
    if (!domainName.trim()) {
      toast.error("Domain name cannot be empty!");
      return;
    }
    dispatch(addDomain(domainName))
      .unwrap()
      .then(() => {
        toast.success("Domain added successfully!");
        setDomainName(""); 
      })
      .catch(() => {
        toast.error("Failed to add domain.");
      });
  };

  return (
    <div className="add-domain-page">
      <div className="form-container">
        <h2>Add a New Domain</h2>
        <form onSubmit={handleAddDomain}>
          <input
            type="text"
            value={domainName}
            placeholder="Enter domain name"
            onChange={(e) => setDomainName(e.target.value)}
            className="input-field"
            required
          />

          <button type="submit" className="submit-button">
            Add Domain
          </button>
        </form>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button className="fetch">
          <Link to="/separation">Fetch mails</Link>
        </button>
      </div>
      <div className="domain-list">
        <h3>Domains</h3>
        {isLoading ? (
          <p>Loading domains...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <ul>
            {domains && domains.length > 0 ? (
              domains.map((domain) => (
                <li key={domain._id} className="domain-item">
                  {domain.domainName}
                </li>
              ))
            ) : (
              <p>No domains found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddDomainPage;
