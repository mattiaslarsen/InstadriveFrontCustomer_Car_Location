// src/components/customer/customer-card/CustomerCard.tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/types/customer";
import { Mail, Phone, CalendarClock } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard = ({ customer }: CustomerCardProps) => {
  const { name, email, phone, is_active, verified, last_login } = customer;

  const getCardStyles = () => {
    if (!is_active) return "border-destructive/50 shadow-sm";
    if (verified) return "border-green-500/50 shadow-sm";
    return "border-secondary/50 shadow-sm";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never logged in";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className={`transition-all hover:shadow-md ${getCardStyles()}`}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          <div className="flex gap-2">
            {verified && (
              <Badge variant="success">Verified</Badge>
            )}
            <Badge variant={is_active ? "default" : "destructive"}>
              {is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {email}
        </div>
        {phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {phone}
          </div>
        )}
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-3 w-3" />
          Last login: {formatDate(last_login)}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CustomerCard;