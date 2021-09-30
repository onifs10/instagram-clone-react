import './style.css';

export default function PageLoader() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="lds-heart">
        <div />
      </div>
    </div>
  );
}
