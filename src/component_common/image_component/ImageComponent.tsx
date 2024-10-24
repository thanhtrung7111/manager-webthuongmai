import { useQuery } from "@tanstack/react-query";

const ImageComponent = ({
  url = "",
  id = "",
  type = "",
  className = "",
}: {
  url: string;
  id: string;
  type: string;
  className: string;
}) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["type", id],
    queryFn: () => url,
  });
  console.log(data);
  return (
    <div className={`${className}`}>
      <img
        src={
          isSuccess
            ? data
            : "https://st4.depositphotos.com/14953852/24787/v/380/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        alt=""
      />
    </div>
  );
};

export default ImageComponent;
