const Sale = ({ sale }) => {
  return (
    <tr className="bg-yellow-200">
      <td className="border border-green-600">{sale.card_id}</td>
      <td className="border border-green-600">{sale.sales_rep_id}</td>
      <td className="border border-green-600">
        {sale.date
          ? new Date(sale.date).toLocaleString()
          : new Date().toLocaleString()}
      </td>
      <td className="border border-green-600">{sale.amount_paid}</td>
      <td style={{ cursor: "pointer" }}>&#x2715;</td>
      <td style={{ cursor: "pointer" }}>&#x270D;</td>
    </tr>
  );
};

export default Sale;
