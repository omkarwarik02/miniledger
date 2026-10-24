import { getLoans, getSummary, Loan } from "../lib/loanApi";
import { Summary } from "../lib/loanApi";
import { ActivityIndicator, Text, View, Pressable } from "react-native";

type LoanItemProps = {
  loan: Loan;
  onRepay: (id: number) => void;
  onDelete: (id: number) => void;
};
const badge = {
  overdue: { label: "OVERDUE", className: "bg-danger/15 text-danger" },
  pending: { label: "PENDING", className: "bg-line text-muted" },
  repaid: { label: "REPAID", className: "bg-success/15 text-success" },
};
const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

// "2026-10-30" → "30 Oct 2026"
function formatDate(ymd: string) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function LoaItem({ loan, onRepay, onDelete }: LoanItemProps) {
  const status = loan.repaid_at
    ? "repaid"
    : loan.is_overdue
      ? "overdue"
      : "pending";
  const b = badge[status];

  return (
    <View
      className={`rounded-2xl bg-surface p-4 gap-3 border border-line ${
        status === "overdue" ? "border-l-4 border-l-danger" : ""
      } ${status === "repaid" ? "opacity-60" : ""}`}
    >
      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-xl bg-surface2 items-center justify-center">
          <Text className="font-inter-semibold text-fg">
            {getInitials(loan.friend_name)}
          </Text>
        </View>

        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <Text
              numberOfLines={1}
              className="shrink font-inter-semibold text-[16px] text-fg"
            >
              {loan.friend_name}
            </Text>
            <Text
              className={`font-inter-semibold text-[10px] px-2 py-0.5 rounded-md ${b.className}`}
            >
              {b.label}
            </Text>
          </View>
          <Text className="font-inter text-[12px] text-muted">
            Due {formatDate(loan.due_date)}
          </Text>
        </View>

        <Text className="font-inter-semibold text-[16px] text-fg">
          {formatINR(loan.amount)}
        </Text>
      </View>

      <View className="flex-row justify-end gap-2">
        <Pressable
          onPress={() => onDelete(loan.id)}
          className="flex-row items-center gap-1 px-3 py-2 rounded-lg bg-surface2"
        >
          <Text className="font-inter-semibold text-[12px] text-danger">
            Delete
          </Text>
        </Pressable>

        {!loan.repaid_at && (
          <Pressable
            onPress={() => onRepay(loan.id)}
            className="flex-row items-center gap-1 px-3 py-2 rounded-lg bg-surface2"
          >
            <Text className="font-inter-semibold text-[14px] text-success">
              ✓
            </Text>
            <Text className="font-inter-semibold text-[12px] text-fg">
              Mark repaid
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
