import {
    Avatar,
    Button,
    Chip,
    IconButton,
    InputLabel,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import {
    useFetchAllRepoDoubtsMutation,
  } from "../Services/AppApi";
  
  import { useParams } from 'react-router-dom';
  import GitHubCommits from "../components/recentCommits";
  import { styled, alpha } from "@mui/material/styles";
  import InputBase from "@mui/material/InputBase";
  import {DisplayGithubInfo} from "../components/DisplayGithubInfo"
  import "../style/Discuss.css";
  import { useSelector } from "react-redux";
  import CloseRounded from "@mui/icons-material/CloseRounded";
  import AddRoundedIcon from "@mui/icons-material/AddRounded";
  import WhatshotRoundedIcon from "@mui/icons-material/WhatshotRounded";
  import ArrowDropUpSharpIcon from "@mui/icons-material/ArrowDropUpSharp";
  
  import { enqueueSnackbar, SnackbarProvider } from "notistack";
  
  import { useNavigate } from "react-router-dom";
  import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
  import DisplayRepoPostComponent from "../components/DisplayRepoPostComponent";
import {ForkUser} from "../components/ForkUser";
  // import parse from "html-react-parser";
  
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    background: "transparent",
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    }, 
  }));
  
  const RepoDiscussion = () => {
    const { owner, repo } = useParams();
    const [doubts, setDoubts] = useState([]);
    const [allDoubts, setAllDoubts] = useState([]);
    const [searchField, setSearchField] = useState("");
    const user = useSelector((state) => state?.user);

  
    const [criteria, setCriteria] = useState("newest_to_oldest");
    const [openPostDialog, setOpenPostDialog] = useState(false);
  
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
  
    const [fetchRepoDoubts] = useFetchAllRepoDoubtsMutation();
  
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchRepoDoubts({owner,repo}).then(({ data, error }) => {
        if (data) {
          setDoubts(data);
        console.log(doubts)

          setAllDoubts(data);
        } else {
          enqueueSnackbar(
            "Unable to fetch doubts at the moment! Please try again!",
            { variant: "error", autoHideDuration: 3000 }
          );
        }
      });
  
    }, [fetchRepoDoubts]);
  
  
    return (
      <div className="discuss-outer">
            <GitHubCommits/>
        
        <div className="discuss-wrapper">
          <SnackbarProvider maxSnack={3}></SnackbarProvider>
          {openPostDialog && <DisplayRepoPostComponent />}
          <div className="discuss-main-component">
            <div className="discuss-main-component-wrapper">
              <div className="filtering-outer">
                <div className="filtering-wrapper">
                  <div className="filter-buttons">
                    <Button
                      onClick={() => {
                        setDoubts((state) =>
                          state?.sort(
                            (a, b) =>
                              Date.parse(b?.doubtDetails?.createdAt) -
                              Date.parse(a?.doubtDetails?.createdAt)
                          )
                        );
                        setCriteria("newest_to_oldest");
                      }}
                      className={`custom_filter_btn ${
                        criteria === "newest_to_oldest"
                          ? "custom_filter_btn_active"
                          : ""
                      }`}
                    >
                      Newest to Oldest
                    </Button>
                    <Button
                      onClick={() => {
                        setDoubts((state) =>
                          state?.sort(
                            (a, b) =>
                              b?.doubtDetails?.upVotes?.length -
                              a?.doubtDetails?.upVotes?.length
                          )
                        );
                        setCriteria("most_votes");
                      }}
                      startIcon={<WhatshotRoundedIcon />}
                      className={`custom_filter_btn ${
                        criteria === "most_votes"
                          ? "custom_filter_btn_active"
                          : ""
                      }`}
                    >
                      Most Votes
                    </Button>
                    <Button
                      onClick={() => {
                        setCriteria("new_post");
                        setOpenPostDialog(true);
                      }}
                      className={`custom_filter_btn ${
                        criteria === "new_post" ? "custom_filter_btn_active" : ""
                      }`}
                      startIcon={<AddRoundedIcon />}
                    >
                      New
                    </Button>
                  </div>
                  <div className="action-buttons">
                    <div className="search-by-name">
                      <Search className="search-div">
                        <StyledInputBase
                          placeholder="Search by name…"
                          inputProps={{ "aria-label": "search" }}
                          value={searchField}
                          onChange={(e) => setSearchField(e.target.value)}
                        />
                        <IconButton onClick={() => setSearchField("")}>
                          <CloseRounded />
                        </IconButton>
                      </Search>
                    </div>
                    <div className="add-newpost-outer">
                      <div className="add-newpost-wrapper"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doubts-outer">
                <div className="doubts-wrapper">
                  {
                      doubts?.map(( doubtDetails, idx) => (
                          <div key={idx} className="doubt-preview-outer">
                        {/* {doubts+"==============="} */}
                      <div className="doubt-preview-wrapper">
                        <div className="dynamic-info">
                          <div className="owner-profile">
                            <Avatar
                              style={{ width: 63, height: 63 }}
                              src={doubtDetails?.ownerInfo?.photo}
                            />
                          </div>
                          <div className="doubt-info">
                            <div className="doubt-title-and-tags-info">
                              <div
                                // onClick={() =>
                                //   navigate(`/doubt?id=${ ObjectId("65c72feb3f25db26063cb87e")}`)
                                // }
                                className="doubt-title"
                              >
                                {doubtDetails?.doubtTitle
                                  ?.split(" ")
                                  ?.map((word, idx) => {
                                    if (idx < 3) return word + " ";
                                    else if (idx === 3) return word + "...";
                                    return "";
                                  })}
                              </div>
                              <InputLabel
                                className="doubts-tags"
                                style={{ width: "250px", overflowX: "hidden" }}
                              >
                                    {doubtDetails?.tags?.map((tag, idx) => (
                                  <Chip
                                    key={idx}
                                    onClick={() => {
                                      if (selectedTags.indexOf(tag) === -1)
                                        setSelectedTags((state) => [
                                          ...state,
                                          tag,
                                        ]);
                                      else
                                        setSelectedTags((state) =>
                                          state.filter((all) => all !== tag)
                                        );
                                    }}
                                    className={`home-post-tags ${
                                      selectedTags.indexOf(tag) !== -1
                                        ? "active"
                                        : ""
                                    }`}
                                    label={tag}
                                  />
                                ))}
                              </InputLabel>
                            </div>
                            <div className="doubt-info">
                              <div className="user-info">
                                {`created at ${new Date(
                                  doubtDetails?.createdAt
                                ).toLocaleDateString()} | ${new Date(
                                  doubtDetails?.createdAt
                                ).getHours()}:${new Date(
                                  doubtDetails?.createdAt
                                ).getMinutes()}`}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="static-info">
                          <div className="info-outer">
                            <VisibilityRounded />
                            {doubtDetails?.views}
                          </div>
                          <div className="info-outer">
                            <ArrowDropUpSharpIcon />
                            {doubtDetails?.upVotes?.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="doubts-tags-outer">
              <div className="doubts-tags-wrapper">
                {tags?.map((tag) => (
                  <Chip
                    onClick={() => {
                      if (selectedTags.indexOf(tag) === -1)
                        setSelectedTags((state) => [...state, tag]);
                      else
                        setSelectedTags((state) =>
                          state.filter((all) => all !== tag)
                        );
                    }}
                    className={`home-post-tags ${
                      selectedTags.indexOf(tag) !== -1 ? "active" : ""
                    }`}
                    key={tag}
                    label={tag}
                  />

                ))}
                <DisplayGithubInfo/>
            <ForkUser/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RepoDiscussion;
  