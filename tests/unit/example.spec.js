import { shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";

describe("When", () => {
  it("Must", () => {
    const home = shallowMount(Home);

    expect(home).toBeDefined();
  });
});
