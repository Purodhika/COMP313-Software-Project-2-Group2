import React, { useState, useEffect } from "react";
import axios from "axios";
import Listing from "./Listing";
import accountContext from "../userAccounts/accountContext";

export default function AllListings() {
  const [allListings, setAllListings] = useState([]);
  const { userEmail, userType } = React.useContext(accountContext);

  useEffect(() => {
    axios
      .get("http://localhost:3500/user/listings")
      .then((res) => {
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {userType === "ADMIN" ? <h1>All Listings</h1> : <h1 style={{paddingLeft:'50rem'}}>Your Listings</h1>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', paddingRight:'7rem' }}>
        {userType !== "ADMIN"
          ? allListings.map((listing) =>
              listing.sellerEmail === userEmail ? (
                <Listing
                  key={listing._id}
                  book={listing}
                  setAllListings={setAllListings}
                />
              ) : (
                <div key={listing._id}></div>
              )
            )
          : allListings.map((listing) => (
              <Listing
                key={listing._id}
                book={listing}
                setAllListings={setAllListings}
              />
            ))}
      </div>
    </div>
  );
}
