// StatusButton.js
// import OnlineIndicator from './OnlineIndicator';

const StatusButton = () => {
  return (
    <div className="flex justify-center mt-4 gap-x-4">
      {/* <OnlineIndicator /> */}

      <a
        href="https://jakartamrt.co.id/sites/default/files/inline-images/routemapmrtj.jpg"
        target="_blank"
        className="text-gray-500 hover:underline font-medium"
      >
        Peta
      </a>
      <a
        href="https://stats.uptimerobot.com/SGrhbYd1AL"
        target="_blank"
        className="text-gray-500 hover:underline font-medium"
      >
        Status
      </a>
      <a href="/docs" className="text-gray-500 hover:underline font-medium">
        API
      </a>
      <a className="text-gray-500 hover:text-green-500 font-medium">V0.5.2</a>
    </div>
  );
};

export default StatusButton;
