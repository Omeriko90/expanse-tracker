import { Box, Skeleton, Typography } from "@mui/material";
import { CATEGORIES_ICONS } from "src/constants";
import useGetCategory from "src/hooks/useGetCategory";

interface Props {
  id: string;
}

function Category({ id }: Props) {
  const { data: category, isLoading } = useGetCategory(id);
  const CategoryIcon = CATEGORIES_ICONS[id];

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <Box sx={{ display: "flex", width: 300, alignItems: "center" }}>
      <CategoryIcon />
      <Typography sx={{ marginInlineStart: 1 }} variant="body1">
        {category?.name || "No category selected"}
      </Typography>
    </Box>
  );
}

export default Category;
