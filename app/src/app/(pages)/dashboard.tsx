// Dashboard screen: placeholder for route "/dashboard", shown after login.
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { deleteLoan, getLoans, getSummary, Loan, repayLoan } from "../../../lib/loanApi";
import { Summary } from "../../../lib/loanApi";
import { Screen } from "../../../components/Screen";
import { useFocusEffect, useRouter } from "expo-router";
import { LoaItem } from "../../../components/LoanItem";
import { clearToken } from "../../../lib/auth";

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function DashboardScreen() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadData = useCallback(async () => {
    try {
      setError("");
      const [loansData, summaryData] = await Promise.all([
        getLoans(),
        getSummary(),
      ]);
      setLoans(loansData);
      setSummary(summaryData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );
  async function handleRepay(id: number) {
    try {
      await repayLoan(id);
      loadData();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function handleLogout() {
    Alert.alert("Log out?", "You'll need a new OTP to sign back in.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await clearToken();
          router.replace("/welcome");
        },
      },
    ]);
  }

  function handleDelete(id: number) {
    Alert.alert("Delete loan?", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteLoan(id);
            loadData();
          } catch (err) {
            setError((err as Error).message);
          }
        },
      },
    ]);
  }

  if (loading)
    return (
      <Screen className="items-center justify-center">
        <ActivityIndicator />
      </Screen>
    );

  return (
    <Screen className="justify-between">
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-inter-semibold text-[20px] text-fg ">
            MiniLedger
          </Text>
          <Pressable
            onPress={handleLogout}
            hitSlop={10}
            className="flex-row items-center gap-1 px-3 py-2 rounded-lg bg-surface2"
          >
            <Ionicons name="log-out-outline" size={16} color="#EF4444" />
            <Text className="font-inter-semibold text-[12px] text-danger">
              Logout
            </Text>
          </Pressable>
        </View>
        <View className="w-full bg-surface2 mt-6 gap-3 p-5 rounded-xl">
          <Text className="text-[10px] text-fg font-inter-semibold ">
            TOTAL LENT
          </Text>
          <Text className="text-[30px] text-fg font-inter-semibold">
            {formatINR(summary?.totalLent ?? 0)}
          </Text>

          <View className="bg-surface p-5 rounded-xl flex-row justify-between ">
            <View className="gap-3 items-center">
              <Text className="text-fg text-[12px]">Repaid</Text>
              <Text className="text-[#4AE176] text-[16px]">
                {formatINR(summary?.totalRepaid ?? 0)}
              </Text>
            </View>
            <View className="gap-3 items-center">
              <Text className="text-fg text-[12px]">Overdue</Text>
              <Text className="text-danger text-[16px]">
                {formatINR(summary?.overdueAmount ?? 0)}
              </Text>
            </View>
          </View>
        </View>

        {error ? (
          <Text className="mt-4 font-inter text-sm text-danger text-center">
            {error}
          </Text>
        ) : null}

        <View className="mt-6 flex-1">
          <View className="flex-row justify-between">
            <Text className="font-inter-semibold text-fg text-[16px]">
              Who owes you
            </Text>
            <View className="bg-slate-500 rounded-xl px-2 py-0.5">
              <Text className=" text-fg font-inter-semibold">
                {loans?.length} records
              </Text>
            </View>
          </View>
          <View className="mt-4 flex-1">
            <FlatList
              data={loans}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <LoaItem loan={item} onRepay={handleRepay} onDelete={handleDelete} />
              )}
              ListEmptyComponent={<Text className="text-muted">No loans yet — tap + to add one</Text>}
              contentContainerStyle={{ gap: 12, paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => router.push("/add-loan")}
        className="absolute bottom-8 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center"
      >
        <Ionicons name="add" size={28} color="#0B0F14" />
      </Pressable>
    </Screen>
  );
}
