import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 100,
  duration: '1m',
  rps: 1000 // 1, 10, 100, 1000
};


/* GET */
export default function() {
  const randomId = Math.floor(Math.random() * (10000000 - 9000000 + 1) + 9000000);
  const res = http.get(`http://localhost:3001/api/restaurants/${randomId}`);

  check(res, {
    "status is 200": (r) => r.status == 200
  }) || errorRate.add(1);
};


/* POST */
// export default function() {
//   const url = `http://localhost:3001/api/restaurants`;

//   const payload = {
//     name: "Laduree",
//     images: JSON.stringify(["https://hrr42-sdc.s3.amazonaws.com/photo101.jpg",
//     "https://hrr42-sdc.s3.amazonaws.com/photo102.jpg",
//     "https://hrr42-sdc.s3.amazonaws.com/photo103.jpg",
//     "https://hrr42-sdc.s3.amazonaws.com/photo104.jpg"]),
//   };

//   const params = { headers: {'Content-Type': 'application/x-www-form-urlencoded'} };

//   const res = http.post(url, payload, params);

//   check(res, {
//     "status is 201": (r) => r.status == 201
//   });
// };