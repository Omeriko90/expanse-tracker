import api from "src/api";
import moment from "moment";
import { useQuery } from "react-query";

function useGetMonthTotalExpenses() {
  const startMonthDate = moment().startOf("month");
  const endMonthDate = moment().endOf("month");
  return useQuery(
    ["monthTotalExpense", startMonthDate.format("MMMM")],
    async () => {
      const response = api.getMonthTotalExpense({
        startMonthDate: startMonthDate.format("YYYY-MM-DD HH:mm:ss"),
        endMonthDate: endMonthDate.format("YYYY-MM-DD HH:mm:ss"),
      });
      return (await response).data.totalAmount;
    }
  );
}

export default useGetMonthTotalExpenses;
