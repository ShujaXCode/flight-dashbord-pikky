/**
 * Pikky Assessment
 * @author Shuja Naqvi
 */
"use client";
import React, { useEffect, useState } from "react";
import StatusModal from "@/components/StatusModal";
import { useRouter } from "next/navigation";

interface Flight {
  _id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  status: "Scheduled" | "Delayed" | "Cancelled" | "In-flight";
  departureTime: string;
  flightType: "Commercial" | "Military" | "Private";
  airline: "Delta Airlines" | "United Airlines" | "American Airlines";
}

interface User {
  email: string;
  role: "admin" | "user";
}

const Dashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [filters, setFilters] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    status: "All" as
      | "All"
      | "Scheduled"
      | "Delayed"
      | "Cancelled"
      | "In-flight",
    flightType: "All" as "All" | "Commercial" | "Military" | "Private",
    airline: "All" as
      | "All"
      | "Delta Airlines"
      | "United Airlines"
      | "American Airlines",
  });

  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const startGeneratingFlights = async () => {
      try {
        const response = await fetch("/api/flights/start-generating", {
          method: "POST",
        });

        const data = await response.json();
        console.log("Flight generation response:", data.message);
      } catch (error) {
        console.error("Error triggering flight generation:", error);
      }
    };

    startGeneratingFlights();
  }, []);
  useEffect(() => {
    const updateFlightStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/flights/update-status", {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to update flight status");
        }

        const data = await response.json();
        console.log("Flight status updated successfully:", data);
      } catch (error) {
        console.error("Error updating flight status:", error);
      } finally {
        setLoading(false);
      }
    };

    updateFlightStatus();
  }, []);

  useEffect(() => {
    setIsClient(true);

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      setUser(storedUser);
      fetchFlights();
    }
  }, [router]);

  const fetchFlights = async () => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/flights?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setFlights(data);
      } else {
        console.error("Error fetching flights:", res.statusText);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch flights:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const res = await fetch(`/api/flights?${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setFlights(data);
        } else {
          console.error("Error fetching flights:", res.statusText);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch flights:", error);
        setLoading(false);
      }
    };

    fetchFlights();

    const intervalId = setInterval(() => {
      fetchFlights();
    }, 3000); // 30 seconds polling interval

    return () => clearInterval(intervalId);
  }, [filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateStatus = (status: string) => {
    if (selectedFlight) {
      if (!token) {
        console.error("No token found, user must login.");
        return;
      }

      if (!!user && user.role === "user") {
        console.error("Role should be Admin");
        return;
      }

      fetch(`/api/flights/${selectedFlight._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${data.message}`);
          }
          setIsModalOpen(false);
          fetchFlights();
        })
        .catch((error) => {
          console.error("Update status error:", error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled":
        return "bg-green-200 text-green-800";
      case "Delayed":
        return "bg-yellow-200 text-yellow-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "In-flight":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Flight Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          name="flightNumber"
          value={filters.flightNumber}
          onChange={handleFilterChange}
          placeholder="Flight Number"
          className="p-2 border rounded-md w-full md:w-auto flex-1"
        />
        <input
          type="text"
          name="origin"
          value={filters.origin}
          onChange={handleFilterChange}
          placeholder="Origin"
          className="p-2 border rounded-md w-full md:w-auto flex-1"
        />
        <input
          type="text"
          name="destination"
          value={filters.destination}
          onChange={handleFilterChange}
          placeholder="Destination"
          className="p-2 border rounded-md w-full md:w-auto flex-1"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full md:w-auto flex-1"
        >
          <option value="All">All Statuses</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Delayed">Delayed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="In-flight">In-flight</option>
        </select>
        <select
          name="flightType"
          value={filters.flightType}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full md:w-auto flex-1"
        >
          <option value="All">All Flights</option>
          <option value="Commercial">Commercial</option>
          <option value="Military">Military</option>
          <option value="Private">Private</option>
        </select>
        <select
          name="airline"
          value={filters.airline}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-full md:w-auto flex-1"
        >
          <option value="All">All Airlines</option>
          <option value="Delta Airlines">Delta Airlines</option>
          <option value="United Airlines">United Airlines</option>
          <option value="American Airlines">American Airlines</option>
        </select>
        <button
          onClick={() =>
            setFilters({
              flightNumber: "",
              origin: "",
              destination: "",
              status: "All",
              flightType: "All",
              airline: "All",
            })
          }
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition flex-shrink-0"
        >
          Clear Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Flight Number</th>
              <th className="border p-2 text-left">Airline</th>
              <th className="border p-2 text-left">Origin</th>
              <th className="border p-2 text-left">Destination</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Departure Time</th>
              {user?.role === "admin" && (
                <th className="border p-2 text-left">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight._id}>
                  <td className="border p-2">{flight.flightNumber}</td>
                  <td className="border p-2">{flight.airline}</td>
                  <td className="border p-2">{flight.origin}</td>
                  <td className="border p-2">{flight.destination}</td>
                  <td className={`border p-2 ${getStatusColor(flight.status)}`}>
                    {flight.status}
                  </td>
                  <td className="border p-2">{flight.flightType}</td>
                  <td className="border p-2">
                    {new Date(flight.departureTime).toLocaleString()}
                  </td>
                  {user?.role === "admin" && (
                    <td className="border p-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={() => {
                          setSelectedFlight(flight);
                          setIsModalOpen(true);
                        }}
                      >
                        Update Status
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="border p-2 text-center text-gray-600"
                >
                  No flights available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default Dashboard;
