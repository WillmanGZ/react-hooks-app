import { useState, useEffect } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {
  const [light, setLight] = useState<TrafficLightColor>("red");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        setLight((current) => {
          console.log(current);
          if (current === "red") return "green";
          if (current === "green") return "yellow";
          return "red";
        });

        return 5;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    light,
    countdown,
    colors,
    percentage: (countdown / 5) * 100,
    redLight: light === "red" ? colors[light] : "bg-gray-500",
    yellowLight: light === "yellow" ? colors[light] : "bg-gray-500",
    greenLight: light === "green" ? colors[light] : "bg-gray-500",
  };
};
