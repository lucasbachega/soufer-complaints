import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpClient } from "../../../api/httpClient";
import SelectInput from "../SelectInput";

function UnitsSelector({ value = "", onChange = () => {} }) {
  const data = useSelector((state) => state.units.data);

  //TODO: Desfazer...
  /**
   * Exemplo de implementação do HttpClient
   * (DESFAZER ALTERAÇÃO)
   * @author M.Bachega
   */
  const [units, setUnits] = useState([]);
  useEffect(() => {
    (async () => {
      // não faço ideia do q to fazendo com o useEffect, mas a chamada na api é essa
      const response = await HttpClient.listUnidades();
      if (response.ok) {
        setUnits(response.data);
      }
    })();
  }, []);

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      required
      label={"Unidade"}
      placeholder={"Selecione uma unidade"}
      options={units.map((t) => ({ label: t.text, value: t._id }))}
    />
  );
}

export default UnitsSelector;
