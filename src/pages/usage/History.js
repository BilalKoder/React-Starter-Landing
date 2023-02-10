import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLazyGetUserHistoryQuery } from "../../services/api";
import Modal from "./Modal";
import "./styles/index.css";
import { useImmer } from "use-immer";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorComponent from "../../components/ErrorComponent";
import { formatDate } from "../../utils/formatDate";

const History = () => {
  const [isModalVisible, setIsModalVisible] = useState();
  const [promptData, setPromptData] = useState(null);

  const [Items, setItems] = useImmer([]);
  const [
    getHistory,
    { isLoading, isSuccess, currentData: historyData, isError, isFetching },
  ] = useLazyGetUserHistoryQuery();

  useEffect(() => {
    if (isSuccess && historyData) {
      setItems((draft) => {
        return (draft = [...draft, ...historyData?.Items]);
      });
    }
  }, [isSuccess, historyData]);

  const handleFetch = (arg) => {
    getHistory(arg);
  };

  useEffect(() => {
    handleFetch(null);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <ErrorComponent handleLoading={() => handleFetch(null)} />;
  }

  if (!isSuccess && Items.length == 0) {
    return null;
  }

  const handleClick = (e) => {
    const _id = e.target.name;
    const filteredData = Items?.find((item) => item?._id == _id);
    openModal();
    console.log("filteredData", filteredData);
    setPromptData(filteredData);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleShowMore = () => {
    let arg = historyData?.LastEvaluatedKey;
    if (arg != null) handleFetch(arg);
  };
  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        promptData={promptData}
      />
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          width: "45vw",
          gridTemplateColumns: "repeat(4, 1fr)",
          rowGap: "1rem",
        }}
      >
        <span>Date</span>
        <span>Prompt</span>
        <span>Completion</span>
        <div></div>
        {Items?.map((item, index) => {
          const date = formatDate(item?.createdAt);
          return (
            <React.Fragment key={item._id}>
              <span className="light-dark">{date}</span>
              <span className="prompt-text">{item?.prompt}</span>
              <span className="completed-text">{item?.result}</span>
              <button
                name={item._id}
                className="show-prompt-btn"
                onClick={handleClick}
              >
                Show
              </button>
            </React.Fragment>
          );
        })}
      </div>
      {Items.length > 0 && isSuccess && (
        <button className="show-more-btn" onClick={handleShowMore}>
          {isFetching ? <span>Showing More</span> : <span>Show More</span>}
        </button>
      )}
    </>
  );
};

export default History;
