import { useUserInfoStore } from "@/store/modules/user";
//#hook:hook_1
const userInfoStore = useUserInfoStore();
const styleIcon = {
  width: "80px",
  height: "80px",
  fontSize: "80px",
};

//#end;
() => {
  console.log(userEcharts, ref);
};
return {
  slot: {},
  hook: {
    hook_1: {
      echarts: {
        HOOK: function () {
          return `import userEcharts from "@/hooks/userEcharts";
          import { ref } from "vue";
          const option_1 = ref({
            title: {
              text: "Website",
              subtext: "Fake Data",
              left: "center",
            },
            tooltip: {
              trigger: "item",
            },
            legend: {
              orient: "vertical",
              left: "left",
            },
            series: [
              {
                name: "Access From",
                type: "pie",
                radius: "50%",
                data: [
                  { value: 1048, name: "Search Engine" },
                  { value: 735, name: "Direct" },
                  { value: 580, name: "Email" },
                  { value: 484, name: "Union Ads" },
                  { value: 300, name: "Video Ads" },
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                  },
                },
              },
            ],
          });
          
          const option_2 = ref({
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line",
                areaStyle: {},
              },
            ],
          });
          
          userEcharts(option_1, "leftEcharts");
          userEcharts(option_2, "rightEcharts");`;
        },
        element: function () {},
        antdv: function () {},
      },
    },
  },
};
