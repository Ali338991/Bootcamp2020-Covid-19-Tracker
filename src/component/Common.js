export const searchingFor = (searchQuery) => {
  return function (data) {
    return (data?.country || data || data?.country)
      ?.toLowerCase()
      ?.includes(searchQuery?.toLowerCase());
  };
};
