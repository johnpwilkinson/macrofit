import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// export function NavMain({ items }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
//             <SidebarMenuItem>
//               <SidebarMenuButton asChild tooltip={item.title}>
//                 <a href={item.url}>
//                   <item.icon />
//                   <span>{item.title}</span>
//                 </a>
//               </SidebarMenuButton>
//               {item.items?.length ? (
//                 <>
//                   <CollapsibleTrigger asChild>
//                     <SidebarMenuAction className="data-[state=open]:rotate-90">
//                       <ChevronRight />
//                       <span className="sr-only">Toggle</span>
//                     </SidebarMenuAction>
//                   </CollapsibleTrigger>
//                   <CollapsibleContent>
//                     <SidebarMenuSub>
//                       {item.items.map((subItem) => (
//                         <SidebarMenuSubItem key={subItem.title}>
//                           <SidebarMenuSubButton asChild>
//                             <a href={subItem.url}>
//                               <span>{subItem.title}</span>
//                             </a>
//                           </SidebarMenuSubButton>
//                           {subItem.items?.length ? (
//                             <Collapsible asChild defaultOpen={subItem.isActive}>
//                               <>
//                                 <CollapsibleTrigger asChild>
//                                   <SidebarMenuAction className="data-[state=open]:rotate-90 ml-4">
//                                     <ChevronRight />
//                                     <span className="sr-only">
//                                       Toggle Sub-Items
//                                     </span>
//                                   </SidebarMenuAction>
//                                 </CollapsibleTrigger>
//                                 <CollapsibleContent>
//                                   <SidebarMenuSub>
//                                     {subItem.items.map((nestedItem) => (
//                                       <SidebarMenuSubItem
//                                         key={nestedItem.title}
//                                       >
//                                         <SidebarMenuSubButton asChild>
//                                           <a href={nestedItem.url}>
//                                             <span>{nestedItem.title}</span>
//                                           </a>
//                                         </SidebarMenuSubButton>
//                                       </SidebarMenuSubItem>
//                                     ))}
//                                   </SidebarMenuSub>
//                                 </CollapsibleContent>
//                               </>
//                             </Collapsible>
//                           ) : null}
//                         </SidebarMenuSubItem>
//                       ))}
//                     </SidebarMenuSub>
//                   </CollapsibleContent>
//                 </>
//               ) : null}
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }
const MenuItemComponent = ({ item }) => {
  return (
    <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title}>
          <a href={item.url}>
            {item.icon && <item.icon />}
            <span className="text-base font-semibold">{item.title}</span>
          </a>
        </SidebarMenuButton>
        {item.items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    {subItem.items?.length ? (
                      <MenuItemComponent item={subItem} />
                    ) : (
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span className="text-base font-semibold">
                            {subItem.title}
                          </span>
                        </Link>
                        {/* <a href={subItem.url}>
                          <span className="text-base font-semibold">
                            {subItem.title}
                          </span>
                        </a> */}
                      </SidebarMenuSubButton>
                    )}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
};

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <MenuItemComponent key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
