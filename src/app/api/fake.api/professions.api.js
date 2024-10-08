export const professionsObject = {
  doctor: { _id: "67rdca3eeb7f6fgeed471818", name: "Doctor" },
  waiter: { _id: "67rdca3eeb7f6fgeed471820", name: "Waiter" },
  physics: { _id: "67rdca3eeb7f6fgeed471814", name: "Physicist" },
  engineer: { _id: "67rdca3eeb7f6fgeed471822", name: "Engineer" },
  actor: { _id: "67rdca3eeb7f6fgeed471824", name: "Actor" },
  cook: { _id: "67rdca3eeb7f6fgeed471829", name: "Kitchener" },
};
export const professions = [
  { _id: "67rdca3eeb7f6fgeed471818", name: "Doctor" },
  { _id: "67rdca3eeb7f6fgeed471820", name: "Waiter" },
  { _id: "67rdca3eeb7f6fgeed471814", name: "Physicist" },
  { _id: "67rdca3eeb7f6fgeed471822", name: "Engineer" },
  { _id: "67rdca3eeb7f6fgeed471824", name: "Actor" },
  { _id: "67rdca3eeb7f6fgeed471829", name: "Kitchener" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(professions);
    }, 0);
  });

export default {
  fetchAll,
};
