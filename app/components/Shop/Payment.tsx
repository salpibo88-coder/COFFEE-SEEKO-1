"use client";

import { useState } from "react";
import { FiSmartphone, FiCreditCard, FiCheckCircle } from "react-icons/fi";

const paymentMethods = [
  { id: "aba", name: "ABA Bank", icon: "📱" },
  { id: "acleda", name: "ACLEDA Bank", icon: "🏦" },
  { id: "wing", name: "Wing Bank", icon: "💸" },
  { id: "canadia", name: "Canadia Bank", icon: "💳" },
];

export default function PaymentMethodSection() {
  const [selected, setSelected] = useState("aba");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
      <h3 className="text-lg font-black text-gray-900 mb-4">Select Payment</h3>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelected(method.id)}
            className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
              selected === method.id 
                ? "border-green-500 bg-green-50" 
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <span className="text-2xl mr-4">{method.icon}</span>
            <span className="font-bold text-gray-700 flex-1 text-left">{method.name}</span>
            {selected === method.id && <FiCheckCircle className="text-green-500" size={20} />}
          </button>
        ))}
      </div>

      <button className="w-full mt-6 bg-green-500 text-white font-black py-3 rounded-xl hover:bg-green-600 transition-colors">
        Confirm & Pay
      </button>
    </div>
  );
}