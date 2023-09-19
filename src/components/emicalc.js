import React, { useState, useEffect } from "react";
import Slider from "./Slider-input";
import Button from "react-bootstrap/Button";
import { tenureData } from "../Utils/constants";
import TextInput from "./TextInput";
import "./emicalc.css";

const Emicalc = () => {
  const [count, setCount] = useState(0);
  const [emi, setEMI] = useState();
  const [downPayment, setDownPayment] = useState(0);
  const [intrest, setIntrest] = useState(0);
  const [fee, setFee] = useState(1);
  const [tenure, setTenure] = useState(12);

  const calculateEMI = (downpayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]

    const loanAmount = count - downpayment;
    const rateofIntrest = intrest / 100;
    const numberofYears = tenure / 12;

    const emi =
      (loanAmount * rateofIntrest * (1 + rateofIntrest) ** numberofYears) /
      ((1 + rateofIntrest) ** numberofYears - 1);

    return Number(emi / 12).toFixed(0);
  };

  const calculateDp = (emi) => {
    const dpPercentage = 100 - (emi / calculateEMI(0)) * 100;
    const result = Number(dpPercentage / 100) * count;

    return result.toFixed(0);
  };

  useEffect(() => {
    if (!(count > 0)) {
      setDownPayment(0);
      setEMI(0);
    }
    const emi = calculateEMI(downPayment);
    setEMI(emi);
  }, [tenure, count]);

  const updateEMI = (e) => {
    const emi = Number(e.target.value);
    const result = calculateEMI(emi);
    setEMI(result);
    setDownPayment(emi);
  };

  const updateDownPayment = (e) => {
    const dp = Number(e.target.value);
    setEMI(dp);
    const result = calculateDp(dp);
    setDownPayment(result);
  };

  const totalEMI = () => {
    const result = emi * tenure;
    if (isNaN(result)) return 0;
    return result.toFixed(0);
  };

  const totalDownpayment = () => {
    const downpay = (count - downPayment) * (fee / 100);
    const result = (downPayment + downpay).toFixed(0);

    return result;
  };

  totalDownpayment();
  return (
    <div className="emiCalc-container">
      <h1>EMI Calculator</h1>
      <p>Total Cost of Asset</p>
      <TextInput
        title="Total Cost of Asset"
        state={count}
        onChange={(e) => setCount(e.target.value)}
      />
      <p>Interest Rate (in %)</p>
      <TextInput
        title="Interest Rate (in %)"
        state={intrest}
        onChange={(e) => setIntrest(e.target.value)}
      />
      <p>Processing Fee (in %)</p>
      <TextInput
        title="Processing Fee (in %)"
        state={fee}
        onChange={(e) => setFee(e.target.value)}
      />
      <div className="down-payment">
        <Slider
          title="Down Payment"
          underLineText={`Total Down Payment - ${totalDownpayment()}`}
          min={0}
          max={count}
          labelMin="0%"
          labelMax="100%"
          value={downPayment}
          onChange={updateEMI}
        />
      </div>
      <div className="total-amount">
        <Slider
          title="loan per month"
          underLineText={`Total loan Amount - ${totalEMI()}`}
          min={0}
          max={count}
          labelMin="0%"
          labelMax="100%"
          value={emi}
          onChange={updateDownPayment}
        />
      </div>
      <p>Tenure</p>
      <div className="tenure-buttons">
        {tenureData?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <Button
                id={i}
                onClick={(e) => setTenure(+e.target.innerHTML)}
                variant={tenure === item ? "primary" : "secondary"}
              >
                {item}
              </Button>
              {"    "}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Emicalc;
