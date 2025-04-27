import dynamic from "next/dynamic";

const Maps = dynamic(() => import("./map-container"), { ssr: false });
export default Maps;
