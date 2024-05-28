import { ChangeEvent } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

interface sortInterface {
  options: { name: string; label: string }[];
}
const SortBy = ({ options }: sortInterface) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const constantSort = searchParams.get("sortBy") || "";

  function handleOnChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target?.value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <Select
        type="white"
        options={options}
        value={constantSort}
        onChange={handleOnChange}
      />
    </>
  );
};

export default SortBy;
