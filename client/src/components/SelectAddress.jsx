import axios from "axios";
import useAddresses from "../useAddresses";
import { Authurl } from "../assets/api";

export default function SelectAddress({ onSelect }) {
  const { addresses, loading, refresh } = useAddresses();

  const selectedId = addresses.find((a) => a.isDefault)?._id || "";

  const selectAddress = async (id) => {
    if (!id) return;

    await axios.put(
      `${Authurl}/address/select/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    refresh();
    onSelect?.(id);
  };

  const deleteAddress = async (id) => {
    await axios.delete(`${Authurl}/address/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    refresh();
  };

  if (loading) return <p className="text-gray-500">Loading addresses...</p>;
  if (!addresses.length)
    return <p className="text-gray-500">No saved addresses</p>;

  const selectedAddress = addresses.find((a) => a._id === selectedId);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Delivery Address
        </h3>

        <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-medium">
          Shipping
        </span>
      </div>

      {/* Dropdown */}
      <select
        value={selectedId}
        onChange={(e) => selectAddress(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="" disabled>
          Select an address
        </option>

        {addresses.map((addr) => (
          <option key={addr._id} value={addr._id}>
            {addr.fullName} — {addr.street}, {addr.city} ({addr.postalCode})
          </option>
        ))}
      </select>

      {/*  Selected Address Preview */}
      {selectedAddress && (
        <div className="border rounded-xl p-4 bg-green-50 border-green-400 text-sm text-gray-700">
          <p className="font-medium">{selectedAddress.fullName}</p>
          <p>{selectedAddress.street}</p>
          <p>
            {selectedAddress.city}, {selectedAddress.state} -{" "}
            {selectedAddress.postalCode}
          </p>
          <p>{selectedAddress.country}</p>
          <p className="text-gray-500 mt-1">📞 {selectedAddress.phone}</p>

          <button
            onClick={() => deleteAddress(selectedAddress._id)}
            className="mt-3 text-xs text-red-600 hover:underline"
          >
            Delete Address
          </button>
        </div>
      )}
    </div>
  );
}
