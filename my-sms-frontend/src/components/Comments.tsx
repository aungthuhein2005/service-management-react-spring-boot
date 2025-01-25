import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";

interface CommentProps {
  commentList: Array<{
    user: {
      name: string;
    };
    id: number;
    createdAt: string;
    text: string;
  }>;
}

function Comments({ commentList }: CommentProps) {
  const {id} = useParams<{id: string}>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [updatedComments, setUpdatedComments] = useState(commentList);

  useEffect(() => {
    setUpdatedComments(commentList); // Update comments when props change
  }, [commentList]);


  const handleSave = (index: number) => {
    setEditingIndex(null);
    axios.put(`http://localhost:8484/api/tickets/${id}/comments/${updatedComments[index].id}?comment=${updatedComments[index].text}`)
    .then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error("Error updating comment:", error);
    });
  }

  const handleDelete = (index: number) => {
    axios.delete(`http://localhost:8484/api/tickets/comments/${updatedComments[index].id}`)
    .then((response) => {
      console.log(response.data);
      if(response.status === 204) {
        setUpdatedComments(updatedComments.filter((_, i) => i !== index));
      }
    }).catch((error) => {
      console.error("Error deleting comment:", error);
    });
  }


  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {updatedComments.map((comment, index) => (
          <div key={index} className="p-2">
            {/* Header: Avatar + Name + Actions */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar className="w-8 h-8 bg-slate-300 flex items-center justify-center rounded-full">
                <AvatarFallback className="text-white font-bold text-sm">
                  {comment.user?.name?.charAt(0)?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex-1">
                <span className="font-semibold text-gray-700">{comment.user.name}</span>
                <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>

              {/* Action Menu (Aligned Right) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 ml-auto">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditingIndex(index)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=> handleDelete(index)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Comment Text or Input Field */}
            <div className="my-2">
              {editingIndex === index ? (
                <div className="relative">
                  <input
                    value={updatedComments[index].text}
                    onChange={(e) => {
                      const newComments = updatedComments.map((c, i) =>
                        i === index ? { ...c, text: e.target.value } : c
                      );
                      setUpdatedComments(newComments);
                    }}
                    className="w-full p-2 border-2 border-blue-500 bg-blue-50 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                  />
                  <Button
                    onClick={() => handleSave(index)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-3 py-1 text-sm rounded-md"
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <p className="text-gray-800 text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200 transition">
                  {comment.text}
                </p>
              )}
            </div>

            {/* Divider */}
            <hr />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Comments;
