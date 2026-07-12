import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App.jsx";

function LiveSite() {
  const { slug } = useParams(); // Gets the slug from the URL
  const [site, setSite] = useState(null);

  useEffect(() => {
    const fetchSite = async () => {
      try {
        // You need a backend route to find a site by slug
        const res = await axios.get(`${serverURL}/api/website/get-by-slug/${slug}`);
        setSite(res.data);
      } catch (err) {
        console.error("Site not found");
      }
    };
    fetchSite();
  }, [slug]);

  if (!site) return <div>Loading...</div>;

  return (
    <div className="w-full h-full">
      {/* This renders the actual saved HTML code */}
      <iframe 
        title="Live Site"
        srcDoc={site.latestCode} 
        className="w-full h-screen border-none"
      />
    </div>
  );
}

export default LiveSite;