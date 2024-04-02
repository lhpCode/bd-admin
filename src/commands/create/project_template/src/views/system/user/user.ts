import { ref } from "vue";
import Table from "@/components/table/table.vue";
import EditUser from "./editUser.vue";

const dataSource = [
  {
    userName: "aaa",
    nickname: "测试用户",
    role: "admin",
    email: "8888@qq.com",
    phoneNumber: "19166666666",
    createTime: "2024/3/29",
    updateTime: "2024/3/29",
  },
];
const columns = [
  {
    title: "用户名",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "手机",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "修改时间",
    dataIndex: "updateTime",
    key: "updateTime",
  },
];

const form = ref({});
const state = ref<{
  show: boolean;
  status: "edit" | "add";
}>({
  show: false,
  status: "add",
});

const add = () => {
  form.value = {};
  state.value.show = true;
  state.value.status = "add";
};
const edit = () => {
  form.value = {
    userName: "aaa",
    nickname: "测试用户",
    role: "admin",
    email: "8888@qq.com",
    phoneNumber: "19166666666",
    createTime: "2024/3/29",
    updateTime: "2024/3/29",
  };
  state.value.show = true;
  state.value.status = "edit";
};
//#end;
() => {
  console.log(Table, EditUser);
};
return {
  slot: {},
  hook: {},
};
