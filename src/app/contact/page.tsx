import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground">Get in Touch</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you. Whether you have a question about our art, artists, or an order, our team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-muted-foreground">For inquiries, support, and everything in between.</p>
              <a href="mailto:hello@cherifsgallery.com" className="text-primary hover:underline">hello@cherifsgallery.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-muted-foreground">Mon-Fri from 9am to 5pm.</p>
              <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
            </div>
          </div>
           <div className="flex items-start gap-4">
            <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold">Our Studio</h3>
              <p className="text-muted-foreground">123 Art Avenue, Creativity City, 10101</p>
              <a href="#" className="text-primary hover:underline">Get Directions</a>
            </div>
          </div>
        </div>
        
        <form className="space-y-6 p-8 bg-secondary/20 rounded-lg">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Your Name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="How can we help you?" rows={5} />
          </div>
          <Button type="submit" size="lg" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
