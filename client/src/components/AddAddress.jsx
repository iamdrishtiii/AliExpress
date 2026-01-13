import { useState } from "react";
import axios from "axios";
import { Authurl } from "../assets/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddAddress() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      setLoading(true);
      await axios.post(`${Authurl}/address`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast("Address added successfully");
      navigate(-1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <input
        name="street"
        placeholder="Street Address"
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          name="state"
          placeholder="State"
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          name="postalCode"
          placeholder="Postal Code"
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <input
        name="country"
        placeholder="Country"
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
          className="accent-orange-500"
        />
        Set as default address
      </label>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
    </div>
  );
}
