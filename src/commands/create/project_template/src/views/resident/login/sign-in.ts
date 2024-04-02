import { reactive, ref } from "vue";
import { useUserInfoStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import type { FormRules, FormInstance } from "element-plus";
import { userLoginApi } from "@/api/user";
const userInfoStore = useUserInfoStore();
const router = useRouter();
const styleIcon = {
  width: "16px",
  height: "16px",
  fontSize: "16px",
};
interface RuleForm {
  name: string;
  password: string;
}
const loginForm = reactive<RuleForm>({
  name: "",
  password: "",
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    {
      required: true,
      message: "Please input Account ",
      trigger: "change",
    },
  ],
  password: [
    { required: true, message: "Please input Password", trigger: "change" },
  ],
});

const ruleFormRef = ref<FormInstance>();
const loadingFlag = ref(false);
const submitForm = async (formEl: FormInstance | undefined) => {
  loadingFlag.value = true;
  if (!formEl) return (loadingFlag.value = false);
  formEl
    .validate()
    .then(async () => {
      const { data } = await userLoginApi(loginForm);
      const { userName, token, nickName } = data;
      loadingFlag.value = false;
      if (!token) {
        return alert("测试账号 test 和admin ，密码任意字符");
      }
      userInfoStore.login({
        userName,
        token,
        nickName,
      });

      router.push("/");
    })
    .catch((fields) => {
      loadingFlag.value = false;
      console.log("error submit!", fields);
    });
};

//#end;
return {
  slot: {},
  hook: {},
};
