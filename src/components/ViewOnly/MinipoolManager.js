import { useCall } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Contract Address
import contractAddresses from "../../data/contractAddresses.json";
// ABI
import MinipoolManagerABI from "../../abi/contract/MinipoolManager.sol/MinipoolManager.json";

function useMinipoolManager(func,argArray) {
  const MinipoolManagerInterface = new utils.Interface(MinipoolManagerABI.abi);
  const { value, error } =
    useCall(
      func && {
        contract: new Contract(
          contractAddresses["MinipoolManager"],
          MinipoolManagerInterface
        ), // instance of called contract
        method: func, // Method to be called
        args: argArray, // Method arguments - address to be checked for balance
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

function MinipoolManager() {
  // MinipoolManager.sol Stats
  const minipoolCount = useMinipoolManager("getMinipoolCount",[])
  const mps_0 = useMinipoolManager("getMinipools",[0,0,0])
  const mps_1 = useMinipoolManager("getMinipools",[1,0,0])
  const mps_2 = useMinipoolManager("getMinipools",[2,0,0])
  const mps_3 = useMinipoolManager("getMinipools",[3,0,0])
  const mps_4 = useMinipoolManager("getMinipools",[4,0,0])
  const mps_5 = useMinipoolManager("getMinipools",[5,0,0])
  return (
    <Card
      sx={{ boxShadow: 10 }}
      style={{
        width: "200px",
        height: "125px",
        marginTop: 20,
        border: "solid",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          <b>#</b> of minipools:
        </Typography>
        {minipoolCount && (
          <Typography variant="h6" component="div">
            {minipoolCount.toNumber()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default MinipoolManager;
