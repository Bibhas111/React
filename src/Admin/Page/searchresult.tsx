import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";
import { IUserProfileData } from "./types/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { Envelope } from "react-bootstrap-icons";
import { Translate } from "react-bootstrap-icons";
import "./css/searchresult.css";
import { IUserProfileDetailData } from "./types/interfaces";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Table from "../../components/table";
import ModalComponent from "../../components/modal";

interface PropsUserSearchInterface {
  data: IUserProfileData[];
}

const Searchresult: React.FunctionComponent<PropsUserSearchInterface> = ({
  data,
}: PropsUserSearchInterface) => {
  const configValue: string | undefined =
    process.env.REACT_APP_SOME_CONFIGURATION;
  const userProfileURL = configValue + "GetUserProfileDetail";
  const patchProfileURL = configValue + "PatchUserProfile";

  const [show, setShow] = useState(false);
  const [Status, SetStatus] = useState(false);
  const [showObjectID, setObjectID] = useState("");
  const [showform, setform] = useState(false);

  const [showObjectDetail, setObjectDetail] = useState<IUserProfileDetailData>({
    displayName: "",
    accountEnabled: false,
    email: "",
    locale: "",
    username: "",
    customerId: "",
    phone: "",
    userId: "",
  });

  const handleClose = () => {
    setShow(false);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const rowSelected = (rowvalue: any) => {
    
     setObjectID(rowvalue.data["objectId"]);
     setShow(true);
  };

  const [rowData, setRowData] = useState<IUserProfileData[]>(data);

  useEffect(() => {
    axios
      .get(userProfileURL, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*",
        },
        params: { objectId: showObjectID },
      })
      .then((response) => {
        setObjectDetail(response.data);
      });
  }, [showObjectID, userProfileURL]);

  useEffect(() => {
    setRowData(data);
  }, [data]);

  const saveChanges = (event: { preventDefault: () => void }) => {
    //event.preventDefault();

    axios
      .get(patchProfileURL, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Origin": "*",
        },
        params: { userId: showObjectID, userAction: Status },
      })
      .then((response) => {
        console.log("updated" + response.data);
        setform(true);
      });
  };

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "accountenabled",
      filter: "agNumberColumnFilter",
      maxWidth: 150,
      headerName: "Account Status",
      type: "centerAligned",
    },
    {
      field: "objectId",
      filter: "agNumberColumnFilter",
      maxWidth: 220,
      headerName: "Account ID",
    },
  ]);

  const setStatusvalue = (status: boolean) => {
    SetStatus(status);
    console.log("Status" + status);
  };

  const {
    accountEnabled,
    displayName,
    email,
    locale,
    customerId,
    phone,
    userId,
  }: IUserProfileDetailData = showObjectDetail;

  return (
    <div style={containerStyle}>
      <div
        className="grid-style ag-theme-alpine"
        style={{
          width: "55%",
          height: "15vh",
          marginTop: "3%",
          marginLeft: "25%",
          border: "1px solid grey",
          boxShadow:
            " 0 6px 10px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)",
        }}
      >
        <Table
          rowData={rowData}
          columnDef={columnDefs}
          oncellClicked={rowSelected}
        />
      </div>

      <ModalComponent
        displayname={displayName}
        modalshow={show}
        handleClose={handleClose}
      >
   
        <form onSubmit={saveChanges}>
          <div>
            <div className="left">
              <div className="circle">
                <label className="signature">
                  {email.charAt(0).toUpperCase()}{" "}
                </label>
              </div>
              <div className="leftlabel">
                {" "}
                <Envelope color="grey" size={17} className="icon" />
                <label> Email: {email}</label>
              </div>
              <div className="leftlabel">
                {" "}
                <Translate color="grey" size={17} className="icon" />
                <label> Locale: {locale}</label>
              </div>
            </div>

            <div className="right">
              <label className="label"> Account Status: </label>
              <BootstrapSwitchButton
                checked={accountEnabled}
                onlabel="Enabled"
                offlabel="Disabled"
                width={150}
                onstyle="success"
                onChange={(checked: boolean) => {
                  setStatusvalue(checked);
                }}
              />
            </div>
            
            <div className="right">
              <label className="label"> CustomerID: {customerId} </label>
            </div>
      
            <div className="right">
              <label className="label"> UserID: {userId}</label>
            </div>
            <div className="right">
              <label className="label"> Phone Number: {phone}</label>
            </div>
          
            <div className="right">
              <input type="submit" value="Submit" className="button" />
 
              {showform ? (
                <div className="warningmessage">Account Status Updated!!</div>
              ) : (
                ""
              )}   
            </div>
          </div>
        </form>
      </ModalComponent>
    </div>
  );
};
export default Searchresult;
