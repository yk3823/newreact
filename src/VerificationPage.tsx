import React, { useEffect, useState } from "react";
import DeceasedDetails from "./DeceasedDetails.tsx";

async function verifyToken(token: string): Promise<boolean> {
  return true;
}

const VerificationPage: React.FC = () => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      verifyToken(token).then((result: boolean) => setIsVerified(result));
    }
  }, []);

  if (isVerified === null) {
    return (
      <div>
        <h1>Email Verification</h1>
        <p>Performing verification...</p>
      </div>
    );
  } else if (isVerified) {
    return <DeceasedDetails />;
  }
};

export default VerificationPage;
