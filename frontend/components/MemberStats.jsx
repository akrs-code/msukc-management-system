import React, { useEffect, useState } from "react";
import MembersBarGraph from "./MembersBarGraph";
import { useAuthContext } from "../hooks/useAuthContext";

const MemberStats = () => {
  const { user } = useAuthContext();
  const [beltData, setBeltData] = useState([]);
  const [batchData, setBatchData] = useState([]);
  const [ageData, setAgeData] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        // Fetch all stats in parallel
        const [beltRes, batchRes, ageRes, usersRes] = await Promise.all([
          fetch("/api/membership/stats/belts", { headers }),
          fetch("/api/membership/stats/batches", { headers }),
          fetch("/api/membership/stats/ages", { headers }),
          fetch("/api/membership/stats/users", { headers }),
        ]);

        if (!beltRes.ok || !batchRes.ok || !ageRes.ok || !usersRes.ok) {
          throw new Error("Failed to fetch one or more stats");
        }

        const [beltJson, batchJson, ageJson, usersJson] = await Promise.all([
          beltRes.json(),
          batchRes.json(),
          ageRes.json(),
          usersRes.json(),
        ]);

        setBeltData(beltJson);
        setBatchData(batchJson);
        setAgeData(ageJson);
        setUserStats(usersJson);
      } catch (err) {
        console.error("❌ Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchStats();
  }, [user]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading stats...</p>;
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <MembersBarGraph
        data={beltData}
        xKey="belt"
        barKey="count"
        title="Members per Belt"
      />

      <MembersBarGraph
        data={ageData}
        xKey="age"
        barKey="count"
        title="Members per Age Group"
      />

      <MembersBarGraph
        data={batchData}
        xKey="batch"
        barKey="count"
        title="Members per Batch"
      />

      <MembersBarGraph
        data={userStats}
        xKey="status"
        barKey="count"
        title="Users by Verification Status"
      />
    </div>
  );
};

export default MemberStats;
