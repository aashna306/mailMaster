// // separate.js

// // Function to categorize emails by domain
// export const categorizeEmailsByDomain = (emails, domains) => {
//     const categorizedEmails = {};
  
//     // Initialize the categorizedEmails object with domain names
//     domains.forEach(domain => {
//       categorizedEmails[domain.domainName] = [];
//     });
  
//     // Categorize emails based on the domain
//     emails.forEach(email => {
//       const emailDomain = email.from.split('@')[1]; // Extract domain from the 'from' field
  
//       // Check if the domain is in the list of domains
//       if (categorizedEmails[emailDomain]) {
//         categorizedEmails[emailDomain].push(email);
//       } else {
//         // Group emails with unknown domains in 'Other'
//         if (!categorizedEmails['Other']) {
//           categorizedEmails['Other'] = [];
//         }
//         categorizedEmails['Other'].push(email);
//       }
//     });
  
//     return categorizedEmails;
//   };
  
//   // Function to group emails by specified categories (if needed)
//   export const groupEmails = (categorizedEmails) => {
//     // Example: You can implement grouping logic here if needed
    
//     return categorizedEmails; // Return as is for now
//   };
  

// // separate.js

