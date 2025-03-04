import { serviceHours } from "@/util/generalFields";
import { Card, Col, Row } from "antd";
import { Forum, Inter } from "next/font/google";
const forum = Forum({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  weight: "200",
  subsets: ["latin"],
  display: "swap",
});

export default function MapsCard() {
  return (
    <Card className="contact-card" >
      <div className="maps">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6046.056745015952!2d-73.9892388028343!3d40.73940120461028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a0c2b0ca21%3A0xba4bb404addaa69b!2s130%20E%2023rd%20St%2C%20New%20York%2C%20NY%2010016%2C%20EUA!5e0!3m2!1spt-PT!2sbr!4v1741040908831!5m2!1spt-PT!2sbr" loading="lazy" />
      </div>
    </Card>
  )
}