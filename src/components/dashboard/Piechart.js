import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme,
} from "@material-ui/core";
import { getExecutionTypes } from "../../api";
import { useEffect, useState } from "react";

const Summary = (props) => {
  const theme = useTheme();

  const [pieData, setPieData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.brown[600],
          colors.deepPurple[600],
          colors.lightBlue[600],
          colors.amber[600],
          colors.blue[700],
          colors.deepOrange[600],
          colors.blueGrey[600],
          colors.common[600],
          colors.cyan[600],
          colors.green[600],
          colors.grey[600],
          colors.yellow[300],
        ],
        borderWidth: 4,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: [],
  });

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const [devices, setDevices] = useState([]);

  // const [executionTypes, setExecutionTypes] = useState([]);

  const loadExecutionTypes = () => {
    getExecutionTypes().then((res) => {
      if (!res || res.error) {
        //console.log(res);
      } else {
        let sum = 0;
        let types = [];
        let counts = [];
        let percents = [];

        res.forEach((element) => {
          sum += element.totalCount;
          types.push(element.ExecutionType);
          counts.push(element.totalCount);
        });

        setPieData({
          ...pieData,
          datasets: [...pieData.datasets, { data: counts }],
          labels: types,
        });
        let i = 0;
        res.forEach((element) => {
          percents.push({
            title: element.ExecutionType,
            value: Number(((element.totalCount / sum) * 100).toFixed(3)),
            color: pieData.datasets[0].backgroundColor[i],
          });
          i++;
        });

        setDevices(percents);

        //console.log(res);
      }
    });
  };

  useEffect(() => {
    loadExecutionTypes();
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Job Status Summary" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={pieData} options={options} />
        </Box>
        <Box
          sx={{
            // display: "-ms-grid",
            // justifyContent: "center",
            pt: 1,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              {/* <Icon color="action" /> */}
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h6">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Summary;
