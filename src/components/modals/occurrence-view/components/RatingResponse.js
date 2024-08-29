import { Box, Button, Stack, Typography } from "@mui/joy";
import { Rating } from "@smastrom/react-rating";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { HttpClient } from "../../../../api/httpClient";
import { setError } from "../../../../store/reducers/errorBaseSlice";

const RatingResponse = ({
  rating,
  occurrenceId,
  onChangeRating = () => {},
  type,
  isMy,
}) => {
  const dispatch = useDispatch();

  const [avaliou, setAvaliou] = useState(
    Boolean(rating?.number) && !Number.isNaN(rating?.number)
  );
  const [value, setValue] = useState(rating?.number);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      let res;
      if (type === "causa") {
        res = await HttpClient.avaliarOcorrenciaCausa({
          occurrenceId,
          rating: value,
        });
      } else if (type === "correcao") {
        res = await HttpClient.avaliarOcorrenciaCorrecao({
          occurrenceId,
          rating: value,
        });
      }
      setAvaliou(true);
      setChanged(false);
      onChangeRating(
        type === "causa" ? res?.data?.ratingCausa : res?.data?.ratingCorrecao
      );
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
      }, 2500);
    } catch (error) {
      dispatch(setError({ title: "Erro ao avaliar resposta", error }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      mt={1}
      borderTop={1}
      borderColor={"divider"}
      p={1}
      gap={1}
      alignItems={"flex-start"}
    >
      <Stack direction={"row"} alignItems={"flex-end"} gap={2}>
        <Box>
          {!rating && !isMy ? (
            <Typography
              gutterBottom
              color="neutral"
              fontWeight={"400"}
              level="body-xs"
            >
              O cliente ainda não avaliou a resposta
            </Typography>
          ) : (
            <>
              <Typography
                gutterBottom
                color="neutral"
                fontWeight={"400"}
                level="body-xs"
              >
                {avaliou
                  ? !isMy
                    ? "Avaliação do cliente"
                    : "Sua avaliação"
                  : "O que achou da resposta?"}
              </Typography>
              <Rating
                style={{ width: "100px" }}
                value={value}
                onChange={(v) => {
                  setValue(v);
                  setChanged(true);
                }}
                readOnly={!isMy}
              />
            </>
          )}
        </Box>
        {completed && (
          <Typography level="body-xs">Agradecemos seu feedback</Typography>
        )}
        {changed && value > 0 && (
          <>
            <Button
              onClick={handleConfirm}
              variant="solid"
              size="sm"
              sx={{ px: 1 }}
              loading={loading}
            >
              Enviar
            </Button>
            <Button
              onClick={() => {
                setChanged(false);
                setValue(rating?.number);
              }}
              variant="plain"
              size="sm"
              disabled={loading}
              sx={{ px: 1, ml: -1 }}
            >
              Cancelar
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default memo(RatingResponse);
