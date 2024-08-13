import { useAuth } from "../store/auth";

export const Services = () => {
  const { services } = useAuth(); // Keep this as is

  console.log("Services Data:", services);

  // Make sure you're accessing services.response, not just services
  const serviceList = services.response || []; // Default to an empty array if response is undefined

  return (
    <>
      <h1>Services Route</h1>
      <div className="services-container my-12">
        <div className="grid grid-cols-3 px-20">
          {serviceList.map((currentEle, index) => (
            <div className="border p-12 text-lg" key={currentEle.id || index}>
              <img
                src={currentEle.imageUrl || "/images/login.jpeg"}
                alt={currentEle.service}
                className="w-full"
              />
              <div className="px-2">
                <div className="flex justify-between my-2">
                  <div>{currentEle.provider}</div>
                  <div className="italic">${currentEle.price}</div>
                </div>
                <div className="text-2xl font-bold mb-4">
                  {currentEle.service}
                </div>
                <div>{currentEle.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-screen">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d69970.60272594886!2d77.62563475869176!3d14.658640781048096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14adb4ab0f2e3%3A0x1302f9ca35338555!2sClock%20Tower!5e0!3m2!1sen!2sin!4v1723108448522!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};
