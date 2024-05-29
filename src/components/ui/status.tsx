// StatusButton.js
// import OnlineIndicator from './OnlineIndicator';

const StatusButton = () => {
  return (
    <div className="flex justify-center gap-x-4 text-sm">
      {/* <OnlineIndicator /> */}

      <a
        href="https://jakartamrt.co.id/sites/default/files/2020-09/Feb-2019%20%281%29.jpeg"
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
