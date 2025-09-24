interface PatientRowPrompt {
    name: string
    phone: string
    age: number
    gender: string
    status: string
    statusColor: string
}


export default function PatientRow({ name, phone, age, gender, status, statusColor }: PatientRowPrompt) {
  const statusColors = {
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
  };

  return (
    <tr>
      <td className="px-4 py-4 font-medium">{name}</td>
      <td className="px-4 py-4">{phone}</td>
      <td className="px-4 py-4">{age}</td>
      <td className="px-4 py-4">{gender}</td>
      <td className="px-4 py-4">
        <div className="flex items-center">
          <span className="font-mono">••••••••</span>
          <button
            className="ml-2 text-blue-600"
            onClick={() => {
              navigator.clipboard.writeText("secretPassword123");
              alert(`Password copied to clipboard for ${name}`);
            }}
            aria-label={`Copy password for ${name}`}
          >
            <i className="fas fa-copy"></i>
          </button>
        </div>
      </td>
      <td className="px-4 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-4">
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            aria-label={`View details for ${name}`}
          >
            <i className="fas fa-eye"></i>
          </button>
          <button
            className="text-green-600 hover:text-green-800"
            aria-label={`Edit details for ${name}`}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            aria-label={`Delete record for ${name}`}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}