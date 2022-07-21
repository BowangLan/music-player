import React, { useState } from "react";
import AlbumList from "../components/AlbumList";
import { search_itunes } from "../api";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { process_itunes_album_result, process_itunes_tracks } from "../util";
import { Formik, Field, Form, useField } from "formik";
import { ImSpinner2 } from "react-icons/im";
import SongList from "../components/SongList";

const ResultTypes = [
  { value: "album", label: "Album" },
  { value: "song", label: "Song" },
  { value: "musicArtist", label: "Artist" },
];

const InputTypes = [
  { value: "allArtistTerm", label: "Artist" },
  { value: "songTerm", label: "Title" },
];

const songListConfig = {
  classes: {
    row: (playing) =>
      (playing
        ? "lg:border-blue-500 bg-blue-100"
        : "lg:border-transparent bg-slate-100") +
      ` group py-1 flex-1 lg:border-l-2 flex items-center hover:bg-white transition-all duration-300 `,
    // number: "text-slate-400",
    numberContainer:
      "hidden flex-none w-20 text-center justify-center items-center",
    img: "h-12 aspect-square object-contain rounded-lg ml-2",
    imgContainer: "hidden lg:block py-2 mr-6",
    name: "text-lg font-bold group-hover:text-blue-500 truncate",
    nameContainer: "flex-1 flex flex-col overflow-hidden cursor-pointer",
    author: "text-slate-500 group-hover:text-blue-400 truncate",
    album: "text-slate-500 truncate",
    albumContainer:
      "hidden lg:block w-1/3 flex-none overflow-hidden mr-6 cursor-pointer",
    durationContainer:
      "hidden md:block flex-none justify-self-end flex mr-6 gap-8",
    duration: "w-16 text-right",
  },
};

const SearchResult = ({ resultType, data }) => {
  if (resultType === "album") {
    return <AlbumList data={data} />;
  } else if (resultType === "song") {
    return <SongList songs={data} config={songListConfig} />;
  }
};

const TabField = ({ }) => {
  const [field, meta, helpers] = useField('resultType');
  console.log('render tab field', { field, meta, helpers });
  return (
    <div className="flex">
      {ResultTypes.map((t, i) => (
        <span
          key={i}
          className={`py-2 px-4 flex items-center justify-center cursor-pointer border-b ` + (t.value === field.value ? 'border-b-blue-400 bg-white' : 'border-b-transparent')}
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
  const [isSearching, setIsSearching] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [submittedValues, setSubmittedValues] = useLocalStorageState(
    "saerch_values",
    {
      searchText: "",
      resultType: ResultTypes[0].value,
      inputType: InputTypes[0].value,
    }
  );

  function fetchAlbumList(formValues) {
    console.log("start fetching");
    setIsSearching(true);
    setAlertMessage(null);

    search_itunes(formValues.searchText, {
      limit: 55,
      entity: formValues.resultType,
      attribute: formValues.inputType,
    })
      .then((data) => {
        if (data.results.length === 0) {
          setAlertMessage("No results found.");
        }
        let rData;
        if (submittedValues.resultType === "album") {
          rData = process_itunes_album_result(data.results);
        } else if (submittedValues.resultType === "song") {
          rData = process_itunes_tracks(data.results);
        }
        setSearchResult(rData);
      })
      .catch((error) => {
        setAlertMessage(error.message);
      })
      .then(() => {
        setIsSearching(false);
      });
  }

  console.log("render search page", { searchResult });

  return (
    <div className="flex flex-col py-8">
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
          fetchAlbumList(values);
        }}
      >
        {({ value }) => (
          <Form className="flex flex-col lg:items-stretch gap-4">
            <div className="flex gap-4">
              <Field
                id="searchText"
                name="searchText"
                placeholder="What do you want to hear?"
                className="w-full lg:max-w-md py-3 px-4 rounded-lg bg-white"
              />
              <button
                type="submit"
                className="py-2 px-6 bg-white rounded-md hover:bg-slate-300 transition-all duration-300"
              >
                Search
              </button>
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
              {/* <div className="flex items-center gap-3 mr-4">
                <label htmlFor="resultType">Result Type:</label>
                <Field
                  as="select"
                  id="resultType"
                  name="resultType"
                  className="p-2 bg-gray-300 rounded-md"
                >
                  {ResultTypes.map((item, i) => (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Field>
              </div> */}
              <TabField />
            </div>
          </Form>
        )}
      </Formik>
      {isSearching && <ImSpinner2 size={44} className="animate-spin" />}

      <div className="py-4">
        {alertMessage ? (
          <div className="py-3 px-4 bg-red-200 rounded-lg">
            <span className="text-lg">{alertMessage}</span>
          </div>
        ) : (
          searchResult && (
            <SearchResult
              data={searchResult}
              resultType={submittedValues.resultType}
            />
          )
        )}
      </div>
    </div>
  );
}
