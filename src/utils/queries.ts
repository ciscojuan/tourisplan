export const url: string = `https://api-colombia.com/api/v1`;

export const getTuristicPlans = async () => {
  const data = await fetch(`${url}/TouristicAttraction`);
  return data;
};

export const getTuristicPlan = async (id: string) => {

    const data = await fetch(`${url}/TouristicAttraction/${id}`)
    return data
}
