import * as React from "react";
import moment from "moment";
import {
  Paper,
  TableContainer,
  Typography,
  Box,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { constants } from "../../utils/constant";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const fetchApllicationForm = async ({
  filterStatus = constants.applicationStatus.all,
  page = 1,
  itemPerPage = 10,
}) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/admin/fetch-application-forms`,
    {
      page,
      itemPerPage,
      filterStatus,
    },
    {
      headers: {
        "Content-Type": "application/json", // Set the correct content type
      },
    }
  );

  const applicationForms = response.data;
  console.log(applicationForms);
  return applicationForms;
};

const updateApplicationFormStatus = async ({
  updateStatus,
  applicationFormId,
}) => {
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/admin//update-application-form-status`,
    {
      updateStatus,
      applicationFormId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export default function ApplicationFormsManagement() {
  const [filterStatus, setFilterStatus] = React.useState(
    constants.applicationStatus.all
  );
  const [applicationForms, setApplicationForms] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [selectedApplication, setSelectedApplication] = React.useState(null);
  const [forceReRender, setForceReRender] = React.useState(false);
  const handleChangePage = (event) => {
    setPage(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApllicationForm({
        itemPerPage: rowsPerPage,
        page,
        filterStatus,
      }); // Await API call
      setApplicationForms(data);
    };
    setForceReRender(false);
    fetchData();
  }, [filterStatus, forceReRender, page, rowsPerPage]); // Dependency array inside useEffect

  const handleFilterStatusChanged = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleOpen = (applicationForm) => {
    console.log(applicationForm);
    setSelectedApplication(applicationForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApplication(null);
  };

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item lg={8}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterStatus}
            label="Status"
            onChange={handleFilterStatusChanged}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "20vw" }}
          >
            <MenuItem value={constants.applicationStatus.all}>All</MenuItem>
            <MenuItem value={constants.applicationStatus.pending}>
              Pending
            </MenuItem>
            <MenuItem value={constants.applicationStatus.approved}>
              Approved
            </MenuItem>
            <MenuItem value={constants.applicationStatus.rejected}>
              Rejected
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#dfe6e9", backgroundColor: "#2d3436" }}>
                Fullname
              </TableCell>
              <TableCell sx={{ color: "#dfe6e9", backgroundColor: "#2d3436" }}>
                Language
              </TableCell>
              <TableCell sx={{ color: "#dfe6e9", backgroundColor: "#2d3436" }}>
                Commitment
              </TableCell>
              <TableCell sx={{ color: "#dfe6e9", backgroundColor: "#2d3436" }}>
                Apply date
              </TableCell>
              <TableCell sx={{ color: "#dfe6e9", backgroundColor: "#2d3436" }}>
                {" "}
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationForms.map((applicationForm) => (
              <TableRow
                key={applicationForm._id}
                onClick={() => handleOpen(applicationForm)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "inherit")
                }
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell>{applicationForm.fullName}</TableCell>
                <TableCell>
                  {applicationForm.teachingLanguage.join(", ")}
                </TableCell>
                <TableCell>{applicationForm.teachingCommitment}</TableCell>
                <TableCell>
                  {moment(applicationForm.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor:
                      applicationForm.status ===
                      constants.applicationStatus.pending
                        ? "#fdcb6e"
                        : applicationForm.status ===
                            constants.applicationStatus.rejected
                          ? "#d63031"
                          : "#00b894",
                    color: "white",
                    borderRadius: 30,
                    padding: 10,
                    margin: 5,
                    display: "inline-block",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {applicationForm.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        page={page - 1}
        rowsPerPage={rowsPerPage}
        count={applicationForms.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      ></TablePagination>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <div>
              <p>
                <strong>Full name:</strong> {selectedApplication.fullName}
              </p>
              <p>
                <strong>Teaching Languages:</strong>{" "}
                {selectedApplication.teachingLanguage.join(", ")}
              </p>
              <p>
                <strong>Language skills:</strong>{" "}
                {selectedApplication.languageSkills}
              </p>
              <p>
                <strong>CV:</strong>{" "}
                <Typography
                  component="a"
                  href={selectedApplication.CV}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#d63031",
                    textDecoration: "none",
                    "&:hover": { color: "#ff7675" },
                  }}
                >
                  {selectedApplication.CV}
                </Typography>
              </p>
              <p>
                <strong>Commitment:</strong>{" "}
                {selectedApplication.teachingCommitment}
              </p>
              <p>
                <strong>Submitted at:</strong>{" "}
                {moment(selectedApplication.createdAt).format(
                  "HH:mm DD/MM/YYYY"
                )}
              </p>
              <p>
                <strong>Status:</strong> {selectedApplication.status}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {selectedApplication?.status ===
            constants.applicationStatus.pending && (
            <Button
              onClick={() => {
                updateApplicationFormStatus({
                  updateStatus: constants.applicationStatus.approved,
                  applicationFormId: selectedApplication._id,
                });
                setForceReRender(true);
                setOpen(false);
                setSelectedApplication(null);
              }}
              sx={{ backgroundColor: "#00b894", m: 1 }}
              variant="contained"
            >
              Approve
            </Button>
          )}
          {selectedApplication?.status ===
            constants.applicationStatus.pending && (
            <Button
              onClick={() => {
                updateApplicationFormStatus({
                  updateStatus: constants.applicationStatus.rejected,
                  applicationFormId: selectedApplication._id,
                });
                setForceReRender(true);
                setOpen(false);
                setSelectedApplication(null);
              }}
              sx={{ backgroundColor: "#d63031", m: 1 }}
              variant="contained"
            >
              Reject
            </Button>
          )}
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "#0984e3", m: 1 }}
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
