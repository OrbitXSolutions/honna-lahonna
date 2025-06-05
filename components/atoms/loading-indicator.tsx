'use client'

import { useLinkStatus } from 'next/link'
import { Spinner } from '../ui/spinner'

export default function LoadingIndicator() {
    const { pending } = useLinkStatus()
    return pending ? (
        <Spinner size="small" />
    ) : null
}