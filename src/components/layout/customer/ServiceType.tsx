import { StepProps, Service } from "../../../types/booking";

interface ServiceTypeProps extends StepProps {
  services: Service[];
}

export default function ServiceType({
  data,
  services,
  onUpdate,
  onNext,
  onBack,
}: ServiceTypeProps) {
  const handleSelect = (serviceId: number) => {
    onUpdate({ serviceTypeId: serviceId });
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Step 2: Choose Service Type
        </h2>
        <p className="text-gray-600">
          Select the service you need for your vehicle
        </p>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No services available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-[#020079] mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryServices.map((service) => (
                  <div
                    key={service.serviceId}
                    onClick={() => handleSelect(service.serviceId)}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      data.serviceTypeId === service.serviceId
                        ? 'border-[#020079] bg-[#020079]/5'
                        : 'border-gray-200 hover:border-[#020079]/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h4>
                      <span className="text-[#FFD700] font-bold">
                        Rs. {service.cost.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {service.description}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Est. {service.estimatedHours} hours
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-all"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.serviceTypeId}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            data.serviceTypeId
              ? 'bg-[#020079] hover:bg-[#03009B] text-white cursor-pointer shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}
