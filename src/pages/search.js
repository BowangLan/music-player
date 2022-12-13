import React, { useState, useEffect } from "react";
import AlbumList from "../components/ui/AlbumList";
import { search_itunes } from "../api";
import { HiSearch } from "react-icons/hi";
import SearchBar from "../components/SearchBar";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { process_api_data } from "../util";
import { Formik, Field, Form, useField, useFormikContext } from "formik";
import useSearch from "../hooks/api/useSearch";
import Spinner from "../components/icons/Spinner";
import SongList from "../components/ui/SongList";
import Layout from "../components/Layout";
import { HiOutlineFilter } from "react-icons/hi";
import IconContainer from "../components/icons/IconContainer";
import { useMutation } from "react-query";
import { useSearchHistory } from "../store";

const ResultTypes = [
  { value: "album", label: "Album" },
  { value: "song", label: "Song" },
  { value: "musicArtist", label: "Artist" },
];

const InputTypes = [
  { value: "allArtistTerm", label: "Artist" },
  { value: "songTerm", label: "Title" },
];

const SearchResult = ({ resultType, data }) => {
  if (resultType === "album") {
    return <AlbumList data={data} />;
  } else if (resultType === "song") {
    return <SongList songs={data} showIndex={false} itemPadding="py-2 px-2 md:px-8" />;
  }
};

const TabField = ({}) => {
  const [field, meta, helpers] = useField("resultType");
  console.log("render tab field", { field, meta, helpers });
  return (
    <div className="flex">
      {ResultTypes.map((t, i) => (
        <span
          key={i}
          className={
            `py-2 px-4 flex items-center justify-center cursor-pointer border-b ` +
            (t.value === field.value
              ? "border-b-blue-400 bg-white"
              : "border-b-transparent")
          }
          onClick={() => helpers.setValue(t.value)}
        >
          {t.label}
        </span>
      ))}
    </div>
  );
};

export default function Search() {
  const [searchResult, setSearchResult] = useLocalStorageState(
    "search_result",
    []
  );
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [submittedValues, setSubmittedValues] = useLocalStorageState(
    "saerch_values",
    {
      searchText: "",
      resultType: ResultTypes[0].value,
      inputType: InputTypes[0].value,
    }
  );
  const [submitted, setSubmitted] = useState(false);

  const {
    list: history,
    getOne: getOneSearchHistory,
    addOne: addOneSearchHistory,
    removeOne: removeOneSearchHistory,
  } = useSearchHistory();

  const addHistory = (text) => {
    if (getOneSearchHistory(text)) {
      removeOneSearchHistory(text);
    }
    addOneSearchHistory(text);
  };

  console.log("submitted formvalues", submittedValues);

  const { data, error } = useSearch(submitted, submittedValues?.searchText, {
    entity: submittedValues?.resultType,
    attribute: submittedValues?.inputType,
    limit: 25,
    offset: (page - 1) * 25,
  });
  
  useEffect(() => {
    if (submitted) {
      setSubmitted(false);
    }
  }, [submitted]);

  useEffect(() => {
    setSubmitted(true);
  }, [submittedValues]);

  console.log("render search page", { searchResult });

  return (
    <Layout>
      <div className="flex flex-col py-6 px-6 lg:px-0">
        {/* display any error messages as dismissible alerts */}
        {/* <div className="h-16"></div> */}

        <Formik
          initialValues={{
            searchText: "",
            resultType: ResultTypes[0].value,
            inputType: InputTypes[0].value,
          }}
          onSubmit={(values) => {
            console.log("formik submit", values);
            setSubmittedValues(values);
            addHistory(values.searchText);
            // searchMutation.mutate(values);
            // fetchAlbumList(values);
          }}
        >
          {({ value }) => (
            <Form className="px-8 flex flex-col lg:items-stretch gap-4">
              <div className="w-full flex justify-center items-center">
                <div className="w-full flex gap-2 items-center md:max-w-lg">
                  <SearchBar />
                  <div className="relative w-11 h-11">
                    <IconContainer size="full">
                      <HiOutlineFilter size={22} className="text-slate-700" />
                    </IconContainer>
                    <div className="hidden absolute top-[120%]">
                      <div className="-translate-x-[36%] bg-white shadow-md rounded-lg">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 flex items-center bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <label htmlFor="inputType">Input Type:</label>
                  <Field
                    as="select"
                    id="inputType"
                    name="inputType"
                    className="p-2 bg-gray-300 rounded-md"
                  >
                    {InputTypes.map((item, i) => (
                      <option key={i} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div>
                <TabField />
              </div>
            </Form>
          )}
        </Formik>
        <div className="py-4">
          {error ? (
            <div className="py-3 px-4 bg-red-200 rounded-lg">
              <span className="text-lg">An error occurred</span>
            </div>
          ) : data ? (
            <SearchResult
              data={process_api_data(data.results)}
              resultType={submittedValues?.resultType}
            />
          ) : (
            <div className="w-full pt-24 flex justify-center items-center">
              <Spinner size={44} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
