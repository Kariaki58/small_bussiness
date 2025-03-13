"use client";

import dynamic from "next/dynamic";

const DashboardProductUpload = dynamic(() => import("./DashboardProductUpload"), {
    ssr: false,
});

export default DashboardProductUpload;